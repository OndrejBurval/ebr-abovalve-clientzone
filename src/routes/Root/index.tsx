import { useTranslation } from "react-i18next";
import { useUserData } from "@/composables/useUserData";

import Layout from "@/layout";

import OrderTable from "@/components/OrderTable";
import UserCard from "@/components/UserCard";
import Card from "@/components/ui/Card";

import { Link } from "react-router-dom";

export default function Root() {
	const { t } = useTranslation();
	const { userData, userIsLoading } = useUserData();

	return (
		<Layout title={t("klientskaZona")}>
			<section className="clientZone--dashboard">
				<div className="clientZone--dashboard--orders">
					<Card>
						<OrderTable limit={4} page="root" />
						<Link to="/objednavky">{t("dalsiObjednavky")}</Link>
					</Card>
				</div>

				<div className="clientZone--dashboard--userCard">
					<Card>
						<UserCard isLoading={userIsLoading} user={userData?.user} />
					</Card>
				</div>
			</section>
		</Layout>
	);
}
