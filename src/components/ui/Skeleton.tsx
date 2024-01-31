type Props = {
	className?: string;
};

const Skeleton = ({ className }: Props) => {
	return <div className={`skeleton ${className}`} />;
};

export default Skeleton;
