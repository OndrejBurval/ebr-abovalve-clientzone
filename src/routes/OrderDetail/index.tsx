import Layout from "@/layout";
import PageLoading from "@/routes/OrderDetail/index.loading";
import OrderItemsTable from "@/components/OrderItemsTable";
import Card from "@/components/ui/Card";

import { useParams } from "react-router-dom";
import { useOrderDetailPage } from "@/routes/OrderDetail/index.hook";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDateString } from "@/hooks/useDateString";
import useCurrency from "@/hooks/useCurrency";

import BillingAddress from "@/components/BillingAddress";
import DeliveryAddress from "@/components/DeliveryAddress";
import { useUserData } from "@/hooks/useUserData";
import Breadcrumb from "@/components/Breadcrumb";
import DocumentTable from "@/components/DocumentTable";

const Detail = () => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useOrderDetailPage(parseInt(id));
  const { userData } = useUserData();

  const orderDate = useDateString(data?.order.order_date);
  const promisedDeliveryDate = useDateString(
    data?.order.promised_delivery_date
  );
  {
    /*
	const dueDate = useDateString(data?.order.promised_delivery_date);
    */
  }

  if (isLoading) {
    return <PageLoading />;
  }

  const pageTitle = `${t("objednavkaCislo")}: ${
    data.order.navision_code ? data.order.navision_code : ""
  }`;

  const referenceNumber = data.order.external_document_number
    ? `${t("vaseReference")}: ${data.order.external_document_number}`
    : null;

  return (
    <Layout
      title={pageTitle}
      subtitle={referenceNumber}
      className="orderDetail--layout"
      header={
        <Link to="/objednavky" className="btn btn--primary">
          {t("zpetNaObjednavky")}
        </Link>
      }>
      <Breadcrumb
        links={[
          { href: "/objednavky", label: t("objednavky") },
          {
            href: `/objednavka/${data.order.id || ""}`,
            label: data.order.navision_code || "",
          },
        ]}
      />

      <div className="grid cols-2">
        <div className="orderDetail--wrapper">
          <h3> {t("prehledObjednavky")} </h3>

          <Card title={t("zakladniPrehled")} className="orderDetail--info">
            <ul>
              <li className="info">
                <strong>{t("datumObjednani")}:</strong>

                <span> {orderDate} </span>
              </li>

              <li className="info">
                <strong>{t("predpokladanaDodavka")}:</strong>

                <span> {promisedDeliveryDate} </span>
              </li>

              <li className="info">
                <strong> {t("cenaCelkemBezDPH")}: </strong>
                <span>
                  {useCurrency(
                    data.order.total_without_vat,
                    data.order.currency_code
                  )}
                </span>
              </li>

              {/**
                                     *
							<li className="info">
								<strong> {t("podminkyPlatby")}: </strong>
								<span>{userData.account.payment_code}</span>
							</li>
                                     */}

              <li className="info">
                <strong> {t("stav")}: </strong>
                <td
                  className="px-5"
                  dangerouslySetInnerHTML={{ __html: data.order.state }}
                />
              </li>
              {/**
							{dueDate && (
								<li className="info">
									<strong> {t("terminPlneni")}: </strong>
									<span> {dueDate || "--"} </span>
								</li>
							)}
                            */}
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
                    shipping_zip: data.order.shipping_zip,
                    shipping_country:
                      data.order.shipping_country ||
                      userData.account.billing_country,
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
            totalPriceIncVat={useCurrency(data.order.total_with_vat)}
            totalPriceExcVat={useCurrency(
              data.order.total_without_vat,
              data.order.currency_code
            )}
          />

          {data.order.documents && data.order.documents.length > 0 && (
            <Card title={t("souboryKeStazeni")}>
              <DocumentTable files={data.order.documents} />
            </Card>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Detail;
