import { ReactNode } from "react";

import { useUserData } from "@/composables/useUserData";

import Navigation from "@/components/TheNavigation";
import Skeleton from "@/components/ui/Skeleton";

type Props = {
	title?: string;
	children?: ReactNode;
	header?: ReactNode;
	isLoading?: boolean;
	className?: string;
};

const Default = ({ children, header, title, isLoading, className }: Props) => {
	const { userIsLoading } = useUserData();

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
		</>
	);
};

export default Default;
