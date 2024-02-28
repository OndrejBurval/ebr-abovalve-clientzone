import type Account from "@/types/Account";

import AccountSvg from "@/components/svg/Account";
import City from "@/components/svg/City";
import Globe from "@/components/svg/Globe";
import Document from "@/components/svg/Document";
import Pen from "@/components/svg/Pen";

type SimpleData = {
	name: string;
	billing_street: string;
	billing_city: string;
	billing_zip: string;
	billing_country: string;
	navision_code: string;
};

type Props = {
	data: Account | SimpleData;
};

const BillingAddress = ({ data }: Props) => {
	return (
		<>
			<ul className="userData--info">
				<Pen link="/muj-ucet-formular" />

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
