import { ReactNode } from "react";

import Navigation from "@/components/TheNavigation";

type Props = {
	children: ReactNode;
};

const Default = ({ children }: Props) => {
	return (
		<>
			<Navigation />

			<main>{children}</main>
		</>
	);
};

export default Default;
