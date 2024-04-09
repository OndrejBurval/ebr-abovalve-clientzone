import { useTranslation } from "react-i18next";
import OrderTable from "@/components/OrderTable";
import Layout from "@/layout";
import Breadcrumb from "@/components/Breadcrumb";

const Orders = () => {
	const { t } = useTranslation();

	return (
		<Layout title={t("objednavky")} className="container-sm">
			<Breadcrumb links={[{ href: "/objednavky", label: t("objednavky") }]} />
			<div className="inner">
				<OrderTable showFilter infiniteLoading />
			</div>
		</Layout>
	);
};

export default Orders;
