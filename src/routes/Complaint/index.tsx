import { useTranslation } from "react-i18next";
import { useComplaintPage } from "@/routes/Complaint/index.hook";
import Layout from "@/layout";
import ComplaintTable from "@/components/ComplaintTable";

const Complaint = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useComplaintPage();

	return (
		<Layout title={t("reklamace")}>
			<ComplaintTable items={data} isLoading={isLoading} />
		</Layout>
	);
};

export default Complaint;
