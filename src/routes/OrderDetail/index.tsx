import Layout from "@/layout";
import BillingAddress from "@/components/BillingAddress";
import MailingAddress from "@/components/MailingAddress";
import OrderItemsTable from "@/components/OrderItemsTable";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getOrderItems, getOrder } from "./index.hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Detail = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { data, isLoading, isFetched } = useQuery(
		`orderItems-${id}`,
		() => getOrderItems(parseInt(id)),
		{
			refetchOnWindowFocus: false,
		}
	);

	const { data: orderInfo, isFetched: infoIsFetched } = useQuery(
		`order-${id}`,
		() => getOrder(parseInt(id)),
		{
			refetchOnWindowFocus: false,
		}
	);

	useEffect(() => {
		if ((isFetched && !data) || (infoIsFetched && !orderInfo)) {
			navigate("/404");
		}
	}, [isFetched, data, navigate, orderInfo, infoIsFetched]);

	const getDateString = (date: string) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString("cs-CZ");
	};

	if (isLoading) {
		return <div> Loading... </div>;
	}

	return (
		<Layout title={`Objednávka číslo: ${id}`}>
			<ul className="order--detail--info">
				<li>
					<strong>Datum založení:</strong>

					<span> {getDateString(orderInfo.order_date)} </span>
				</li>

				<li>
					<strong>Cena celkem:</strong>

					<span>
						{orderInfo.total_with_vat}&nbsp;{orderInfo.currency_code}
					</span>
				</li>

				<li>
					<strong>Stav:</strong>

					<span>--</span>
				</li>

				<li>
					<strong>Doprava:</strong>

					<span> {orderInfo.shipping_name || "--"} </span>
				</li>

				<li>
					<strong>Platba:</strong>

					<span> --- </span>
				</li>
			</ul>

			<div className="address">
				<BillingAddress />
				<MailingAddress />
			</div>

			<section>
				<h3> Položky objednávky </h3>

				<OrderItemsTable items={data} />
			</section>
		</Layout>
	);
};

export default Detail;
