import { useTranslation } from "react-i18next";

import Layout from "@/layout";

const Complaint = () => {
	const { t } = useTranslation();

	return <Layout title={t("reklamace")}></Layout>;
};

export default Complaint;
