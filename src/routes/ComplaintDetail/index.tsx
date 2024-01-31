import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "@/layout";
import Card from "@/components/ui/Card";

const ComplaintDetail = () => {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();

	return (
		<Layout title={`${t("reklamaceCislo")}: ${id}`}>
			<Link to="/reklamace" className="btn btn--primary">
				{t("zpetNaReklamace")}
			</Link>

			<div className="complaintPage--wrapper">
				<Card>
					<ul>
						<li className="info">
							<strong>{t("nazev")}</strong>

							<span>--</span>
						</li>

						<li className="info">
							<strong>{t("datumZalozeni")}</strong>

							<span>--</span>
						</li>

						<li className="info">
							<strong>{t("datumUzavreni")}</strong>

							<span>--</span>
						</li>

						<li className="info">
							<strong>{t("stavReklamace")}</strong>

							<span>--</span>
						</li>
					</ul>
				</Card>

				<div className="complaintPage--textarea">
					<label htmlFor="complaintDesc">{t("popis")}</label>
					<textarea
						name="complaintDesc"
						id="complaintDesc"
						cols={30}
						rows={10}
					/>
				</div>

				<Card title={t("dokumenty")}>
					<ul>
						<li className="info">
							<strong>{t("potvrzeni")}</strong>

							<span>--</span>
						</li>

						<li className="info">
							<strong>{t("potvrzeni")}</strong>

							<span>--</span>
						</li>
					</ul>
				</Card>
			</div>
		</Layout>
	);
};

export default ComplaintDetail;
