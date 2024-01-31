import { ReactNode } from "react";

import Navigation from "@/components/TheNavigation";
import Skeleton from "@/components/ui/Skeleton";

type Props = {
	title?: string;
	children?: ReactNode;
	header?: ReactNode;
	isLoading?: boolean;
};

const Default = ({ children, header, title, isLoading }: Props) => {
	return (
		<>
			<Navigation />

			{isLoading ? <Skeleton className="w-52" /> : null}

			<div className="main">
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
