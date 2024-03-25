import { useTranslation } from "react-i18next";
import { useComplaintPage } from "@/routes/Complaint/index.hook";
import Layout from "@/layout";
import ComplaintTable from "@/components/ComplaintTable";
import Breadcrumb from "@/components/Breadcrumb";

const Complaint = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useComplaintPage();

	return (
		<Layout title={t("reklamace")}>
			<Breadcrumb
				links={[
					{
						href: `/reklamace`,
						label: t("reklamace"),
					},
				]}
			/>
			<ComplaintTable items={data} isLoading={isLoading} />
		</Layout>
	);
};

export default Complaint;
