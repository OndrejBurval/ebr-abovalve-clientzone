import Account from "@/types/Account";

type Props = {
	data: Account;
};

const DeliveryAddress = ({ data }: Props) => {
	return (
		<>
			<ul>
				<li>{data.name || ""}</li>
				<li>{data.shipping_street} </li>
				<li>{`${data.shipping_city} ${data.shipping_zip}`}</li>
				<li>{data.shipping_country}</li>
				<li>{data.navision_code || ""}</li>
			</ul>
		</>
	);
};

export default DeliveryAddress;
