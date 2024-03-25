import Layout from "@/layout/index";
import ContactDataForm from "@/components/ContactDataForm";
import { useUserData } from "@/hooks/useUserData";
import Breadcrumb from "@/components/Breadcrumb";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
	const { userIsLoading, userData } = useUserData();
	const { t } = useTranslation();

	return (
		<Layout>
			<Breadcrumb
				links={[{ href: "/kontakt-udaje", label: t("kontaktniUdaje") }]}
			/>

			<div>{!userIsLoading && <ContactDataForm data={userData} />}</div>
		</Layout>
	);
};

export default ContactForm;
