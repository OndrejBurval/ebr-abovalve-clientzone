import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	title?: string;
};

const Card = ({ title, children }: Props) => {
	return (
		<div className="card">
			{title ? <h3>{title}</h3> : null}

			<div className="card__body">{children ? children : null}</div>
		</div>
	);
};

export default Card;
