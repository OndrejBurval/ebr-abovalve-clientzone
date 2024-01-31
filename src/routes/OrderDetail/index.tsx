import Layout from "@/layout";
import PageLoading from "@/routes/OrderDetail/index.loading";
import BillingAddress from "@/components/BillingAddress";
import MailingAddress from "@/components/MailingAddress";
import OrderItemsTable from "@/components/OrderItemsTable";

import { useParams } from "react-router-dom";
import { useDetailPage } from "./index.hook";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDateString } from "@/composables/useDateString";

const Detail = () => {
	const { t } = useTranslation();

	const { id } = useParams<{ id: string }>();
	const { data, isLoading, orderInfo } = useDetailPage(parseInt(id));

	const orderDate = useDateString(orderInfo?.order_date);

	if (isLoading) {
		return <PageLoading />;
	}

	return (
		<Layout title={`Objednávka číslo: ${id}`}>
			<Link to="/objednavky" className="btn btn--primary">
				{t("zpetNaObjednavky")}
			</Link>

			<ul className="order--detail--info">
				<li>
					<strong>Datum založení:</strong>

					<span> {orderDate} </span>
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
