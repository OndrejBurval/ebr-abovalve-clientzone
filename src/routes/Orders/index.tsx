import { useTranslation } from "react-i18next";
import OrderTable from "@/components/OrderTable";
import Layout from "@/layout";
import Breadcrumb from "@/components/Breadcrumb";

const Orders = () => {
	const { t } = useTranslation();

	return (
		<Layout title={t("objednavky")}>
			<Breadcrumb links={[{ href: "/objednavky", label: t("objednavky") }]} />
			<OrderTable showFilter infiniteLoading />
		</Layout>
	);
};

export default Orders;
