import { ReactNode } from "react";

import Navigation from "@/components/TheNavigation";
import Skeleton from "@/components/ui/Skeleton";

type Props = {
	title?: string;
	children?: ReactNode;
	isLoading?: boolean;
};

const Default = ({ children, title, isLoading }: Props) => {
	return (
		<>
			<Navigation />

			{isLoading ? <Skeleton className="w-52" /> : null}
			{title && !isLoading ? <h1>{title}</h1> : null}

			<main>{children ? children : null}</main>
		</>
	);
};

export default Default;
