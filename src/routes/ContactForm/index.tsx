import Layout from "@/layout/index";
import ContactDataForm from "@/components/ContactDataForm";
import { useUserData } from "@/composables/useUserData";

const ContactForm = () => {
	const { userIsLoading, userData } = useUserData();

	return (
		<Layout>
			<div>{!userIsLoading && <ContactDataForm data={userData} />}</div>
		</Layout>
	);
};

export default ContactForm;
