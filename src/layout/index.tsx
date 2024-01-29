import { ReactNode } from "react";

import Navigation from "@/components/TheNavigation";

type Props = {
	title?: string;
	children?: ReactNode;
};

const Default = ({ children, title }: Props) => {
	return (
		<>
			<Navigation />

			{title ? <h1>{title}</h1> : null}

			<main>{children ? children : null}</main>
		</>
	);
};

export default Default;
