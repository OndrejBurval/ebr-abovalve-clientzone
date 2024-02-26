import type { ReactNode } from "react";
import Skeleton from "./Skeleton";

type Props = {
	children?: ReactNode;
	title?: string;
	className?: string;
	isLoading?: boolean;
};

const Card = ({ title, children, className, isLoading }: Props) => {
	return (
		<div className={`card ${className || ""}`}>
			{title ? <h3>{title}</h3> : null}

			<div className="card__body">{isLoading ? <CardLoading /> : children}</div>
		</div>
	);
};

const CardLoading = () => {
	return (
		<ul>
			<li>
				<Skeleton />
			</li>
			<li>
				<Skeleton />
			</li>
			<li>
				<Skeleton />
			</li>
		</ul>
	);
};

export default Card;
