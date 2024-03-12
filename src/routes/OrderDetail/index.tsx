import Layout from "@/layout";
import PageLoading from "@/routes/OrderDetail/index.loading";
import OrderItemsTable from "@/components/OrderItemsTable";
import Card from "@/components/ui/Card";

import { useParams } from "react-router-dom";
import { useOrderDetailPage } from "@/routes/OrderDetail/index.hook";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDateString } from "@/hooks/useDateString";

import BillingAddress from "@/components/BillingAddress";
import DeliveryAddress from "@/components/DeliveryAddress";
import { useUserData } from "@/hooks/useUserData";

const Detail = () => {
	const { t } = useTranslation();

	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useOrderDetailPage(parseInt(id));
	const { userData } = useUserData();

	const orderDate = useDateString(data?.order.order_date);
	const requestedDate = useDateString(data?.order.requested_delivery_date);
	const promisedDate = useDateString(data?.order.promised_delivery_date);
	const dueDate = useDateString(data?.order.due_date);

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
							<strong>{t("datumObjednani")}:</strong>

							<span> {orderDate} </span>
						</li>

						<li className="info">
							<strong>{t("datumExpirace")}:</strong>

							<span>
								{requestedDate} - {promisedDate}
							</span>
						</li>

						<li className="info">
							<strong> {t("cenaCelkemDPH")}: </strong>
							<span>
								{data.order.total_with_vat}&nbsp;{data.order.currency_code}
							</span>
						</li>

						<li className="info">
							<strong> {t("cenaCelkemBezDPH")}: </strong>
							<span>
								{data.order.total_without_vat}&nbsp;{data.order.currency_code}
							</span>
						</li>

						<li className="info">
							<strong> {t("stav")}: </strong>
							<span>{data.order.state || "-"}</span>
						</li>

						{data.order.state !== "completed" && (
							<li className="info">
								<strong> {t("ocekavaneDatumExpirace")}: </strong>
								<span> {dueDate || "--"} </span>
							</li>
						)}
					</ul>
				</Card>

				<Card isLoading={isLoading} className="userData--connected">
					<>
						<div className="billing">
							<strong>{t("fakturacniAdresa")}</strong>
							<BillingAddress disableEdit data={userData.account} />
						</div>

						<div className="delivery">
							<strong> {t("dorucovaciAdresa")}</strong>
							<DeliveryAddress
								disableEdit
								data={{
									name: data.order.shipping_name,
									shipping_street: data.order.shipping_street,
									shipping_city: data.order.shipping_city,
									shipping_zip: "--",
									shipping_country: "--",
								}}
							/>
						</div>
					</>
				</Card>

				{data.order?.description && data.order.description.length > 0 && (
					<Card
						title={t("poznamka")}
						className="orderDetail--desc"
						isLoading={isLoading}>
						{data.order.description}
					</Card>
				)}
			</div>

			<section className="orderDetail--table">
				<h3> {t("polozkyObjednavky")} </h3>
				<OrderItemsTable
					items={data.orderItems}
					currencyCode={data.order.currency_code}
					totalPriceExcVat={data.order.total_without_vat}
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
