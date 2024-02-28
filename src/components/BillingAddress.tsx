import type Account from "@/types/Account";

import AccountSvg from "@/components/svg/Account";
import City from "@/components/svg/City";
import Globe from "@/components/svg/Globe";
import Document from "@/components/svg/Document";

type Props = {
	data: Account;
};

const BillingAddress = ({ data }: Props) => {
	return (
		<>
			<ul className="userData--info">
				{data.name && (
					<li>
						<AccountSvg />
						<p>{data.name}</p>
					</li>
				)}
				<li>
					<City />
					<p>
						<span>{data.billing_street} </span>
						<span>{`${data.billing_city} ${data.billing_zip}`}</span>
					</p>
				</li>
				<li></li>
				<li>
					<Globe />
					<p>{data.billing_country}</p>
				</li>
				{data.navision_code && (
					<li>
						<Document />
						<p>{data.navision_code}</p>
					</li>
				)}
			</ul>
		</>
	);
};

export default BillingAddress;
