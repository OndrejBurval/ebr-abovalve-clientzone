import { twMerge } from "tailwind-merge";

type Props = {
	className?: string;
};

const Skeleton = ({ className }: Props) => {
	return (
		<div
			className={twMerge(
				"skeleton block h-7 bg-gray-200 rounded-full dark:bg-gray-500 mb-4 animate-pulse min-w-3",
				className
			)}
		/>
	);
};

export default Skeleton;
