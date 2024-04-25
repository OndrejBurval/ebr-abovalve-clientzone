import { ReactNode, useState } from "react";

import { ScrollRestoration } from "react-router-dom";

import { useUserData } from "@/hooks/useUserData";
import { useLocation } from "react-router-dom";

import Navigation from "@/components/TheNavigation";
import Skeleton from "@/components/ui/Skeleton";
import Snackbar from "@mui/material/Snackbar";

type Props = {
	title?: string;
	subtitle?: string;
	children?: ReactNode;
	header?: ReactNode;
	isLoading?: boolean;
	className?: string;
};

const Default = ({
	children,
	header,
	title,
	subtitle,
	isLoading,
	className,
}: Props) => {
	const { userIsLoading } = useUserData();
	const { state } = useLocation();

	const [snackbar, setSnackbar] = useState({
		open: state?.snackbar?.open || false,
		message: state?.snackbar?.message || null,
	});

	if (userIsLoading) {
		return <div className="drawer--spinner"></div>;
	}

	return (
		<>
			<ScrollRestoration />
			<Navigation />

			<div className={`main ${className || ""}`}>
				{isLoading ? <Skeleton className="w-52" /> : null}

				<div className="main--header">
					{title && !isLoading ? (
						<h1>
							{title} {subtitle && <span className="subtitle">{subtitle}</span>}
						</h1>
					) : null}

					{!isLoading && header ? header : null}
				</div>

				{children ? children : null}
			</div>

			{snackbar.open && snackbar.message && (
				<Snackbar
					open={snackbar.open}
					autoHideDuration={6000}
					onClose={() => setSnackbar({ ...snackbar, open: false })}
					message={snackbar.message}
				/>
			)}
		</>
	);
};

export default Default;
