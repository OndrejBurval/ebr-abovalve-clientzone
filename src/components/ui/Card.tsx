import type { ReactNode } from "react";

type Props = {
	children?: ReactNode;
	title?: string;
	className?: string;
};

const Card = ({ title, children, className }: Props) => {
	return (
		<div className={`card ${className || ""}`}>
			{title ? <h3>{title}</h3> : null}

			<div className="card__body">{children ? children : null}</div>
		</div>
	);
};

export default Card;
