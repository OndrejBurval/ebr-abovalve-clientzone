import type Account from "@/types/Account";

import AccountSvg from "@/components/svg/Account";
import City from "@/components/svg/City";
import Globe from "@/components/svg/Globe";
import Pen from "@/components/svg/Pen";

type Props = {
	data: Account;
};

const DeliveryAddress = ({ data }: Props) => {
	return (
		<>
			<ul className="userData--info">
				<Pen link="/muj-ucet-formular?delivery=true" />

				{data.name && (
					<li>
						<AccountSvg />
						<p>{data.name}</p>
					</li>
				)}
				<li>
					<City />
					<p>
						<span>{data.shipping_street} </span>
						<span>{`${data.shipping_city} ${data.shipping_zip}`}</span>
					</p>
				</li>
				<li></li>
				<li>
					<Globe />
					<p>{data.shipping_country}</p>
				</li>
			</ul>
		</>
	);
};

export default DeliveryAddress;
