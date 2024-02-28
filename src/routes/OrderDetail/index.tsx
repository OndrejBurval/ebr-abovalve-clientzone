import Layout from "@/layout";
import PageLoading from "@/routes/OrderDetail/index.loading";
import OrderItemsTable from "@/components/OrderItemsTable";
import Card from "@/components/ui/Card";

import { useParams } from "react-router-dom";
import { useOrderDetailPage } from "@/routes/OrderDetail/index.hook";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDateString } from "@/composables/useDateString";

import BillingAddress from "@/components/BillingAddress";
import DeliveryAddress from "@/components/DeliveryAddress";

const Detail = () => {
	const { t } = useTranslation();

	const { id } = useParams<{ id: string }>();
	const { data, isLoading, orderInfo } = useOrderDetailPage(parseInt(id));

	const orderDate = useDateString(orderInfo?.order_date);

	if (isLoading) {
		return <PageLoading />;
	}

	return (
		<Layout
			title={`${t("objednavkaCislo")}: ${id}`}
			header={
				<Link to="/objednavky" className="btn btn--primary">
					{t("zpetNaObjednavky")}
				</Link>
			}>
			<div className="orderDetail--wrapper">
				<Card title={t("zakladniPrehled")} className="orderDetail--info">
					<ul>
						<li className="info">
							<strong>{t("datumZalozeni")}:</strong>

							<span> {orderDate} </span>
						</li>

						<li className="info">
							<strong> {t("cenaCelkem")}: </strong>
							<span>
								{orderInfo.total_with_vat}&nbsp;{orderInfo.currency_code}
							</span>
						</li>

						<li className="info">
							<strong> {t("stav")}: </strong>
							<span>--</span>
						</li>

						<li className="info">
							<strong> {t("doprava")}: </strong>
							<span> {orderInfo.shipping_name || "--"} </span>
						</li>

						<li className="info">
							<strong> {t("platba")}: </strong>
							<span> --- </span>
						</li>
					</ul>
				</Card>

				<Card isLoading={isLoading} className="userData--connected">
					<>
						<div className="billing">
							<strong>{t("fakturacniAdresa")}</strong>
							<BillingAddress
								data={{
									name: "--",
									billing_street: "--",
									billing_city: "--",
									billing_zip: "--",
									billing_country: "--",
									navision_code: "--",
								}}
							/>
						</div>

						<div className="delivery">
							<strong> {t("dorucovaciAdresa")}</strong>
							<DeliveryAddress
								data={{
									name: "--",
									shipping_street: "--",
									shipping_city: "--",
									shipping_zip: "--",
									shipping_country: "--",
								}}
							/>
						</div>
					</>
				</Card>
			</div>

			<section className="orderDetail--table">
				<h3> {t("polozkyObjednavky")} </h3>
				<OrderItemsTable
					items={data}
					currencyCode={orderInfo.currency_code}
					totalPriceExcVat={orderInfo.total_without_vat}
				/>
			</section>

			<div className="orderDetail--documents none">
				<Card title={t("dokumenty")}>
					<ul>
						<li className="info">
							<strong>{t("faktura")}</strong>

							<span>---</span>
						</li>

						<li className="info">
							<strong>{t("dodaciList")}</strong>

							<span>---</span>
						</li>

						<li className="info">
							<strong>{t("potvrzeni")}</strong>

							<span>---</span>
						</li>

						<li className="info">
							<strong>{t("certifikat")}</strong>

							<span>---</span>
						</li>
					</ul>
				</Card>
			</div>
		</Layout>
	);
};

export default Detail;
