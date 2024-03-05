import { useTranslation } from "react-i18next";
import OrderTable from "@/components/OrderTable";
import Layout from "@/layout";

const Orders = () => {
	const { t } = useTranslation();

	return (
		<Layout title={t("objednavky")}>
			<OrderTable showFilter infiniteLoading />
		</Layout>
	);
};

export default Orders;
