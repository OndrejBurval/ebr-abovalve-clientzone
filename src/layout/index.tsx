import { ReactNode, useState } from "react";

import { useUserData } from "@/composables/useUserData";
import { useLocation } from "react-router-dom";

import Navigation from "@/components/TheNavigation";
import Skeleton from "@/components/ui/Skeleton";
import Snackbar from "@mui/material/Snackbar";

type Props = {
	title?: string;
	children?: ReactNode;
	header?: ReactNode;
	isLoading?: boolean;
	className?: string;
};

const Default = ({ children, header, title, isLoading, className }: Props) => {
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
			<Navigation />

			{isLoading ? <Skeleton className="w-52" /> : null}

			<div className={`main ${className || ""}`}>
				<div className="main--header">
					{title && !isLoading ? <h1>{title}</h1> : null}

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
