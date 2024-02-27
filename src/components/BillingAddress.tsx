import Account from "@/types/Account";

type Props = {
	data: Account;
};

const BillingAddress = ({ data }: Props) => {
	return (
		<>
			<ul>
				<li>{data.name || ""}</li>
				<li>{data.billing_street} </li>
				<li>{`${data.billing_city} ${data.billing_zip}`}</li>
				<li>{data.billing_country}</li>
				<li>{data.navision_code || ""}</li>
			</ul>
		</>
	);
};

export default BillingAddress;
