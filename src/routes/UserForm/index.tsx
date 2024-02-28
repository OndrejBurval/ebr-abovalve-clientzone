import Layout from "@/layout/index";
import UserDataForm from "@/components/UserDataForm";
import { useUserData } from "@/composables/useUserData";

const UserForm = () => {
	const { userIsLoading, userData } = useUserData();

	return (
		<Layout>
			<div>{!userIsLoading && <UserDataForm data={userData} />}</div>
		</Layout>
	);
};

export default UserForm;
