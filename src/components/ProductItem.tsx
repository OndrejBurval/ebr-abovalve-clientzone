type Props = {
	title: string;
};

const ProductItem = ({ title }: Props) => {
	const style = {
		color: "white",
		backgroundColor: "#282A35",
		minHeight: "5rem",
		borderRadius: "1rem",
		padding: "10px",
		fontFamily: "Arial",
	};

	return <div style={style}> {title} </div>;
};

export default ProductItem;
