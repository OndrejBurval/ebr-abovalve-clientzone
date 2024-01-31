import Layout from "@/layout";
import PageLoading from "@/routes/OrderDetail/index.loading";
import OrderItemsTable from "@/components/OrderItemsTable";
import Card from "@/components/ui/Card";

import { useParams } from "react-router-dom";
import { useOrderDetailPage } from "@/routes/OrderDetail/index.hook";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDateString } from "@/composables/useDateString";

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

				<Card title={t("fakturacniAdresa")}>
					<ul>
						<li>eBRÁNA s.r.o.</li>
						<li>Milheimova 1010</li>
						<li>Pardubice 530 02</li>
						<li>Česká republika</li>
						<li>259 90 99, CZ2525252</li>
						<li>
							<a href="mailto:novak@seznam.cz">novak@seznam.cz</a>
						</li>
					</ul>
				</Card>

				<Card title={t("dorucovaciAdresa")}>
					<ul>
						<li>eBRÁNA s.r.o.</li>
						<li>Milheimova 1010</li>
						<li>Pardubice 530 02</li>
						<li>Česká republika</li>
					</ul>
				</Card>
			</div>

			<section className="orderDetail--table">
				<h3> {t("polozkyObjednavky")} </h3>
				<OrderItemsTable
					items={data}
					currencyCode={orderInfo.currency_code}
					totalPriceExcVat={orderInfo.total_without_vat}
				/>
				<div className="orderDetail--table--action">
					<button className="btn btn--primary">{t("pridatDoKosiku")}</button>
				</div>
			</section>

			<div className="orderDetail--documents">
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
