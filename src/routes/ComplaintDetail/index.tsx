import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useComplaintDetailPage } from "./index.hook";
import { useDateString } from "@/hooks/useDateString";
import { Link } from "react-router-dom";
import Layout from "@/layout";
import Card from "@/components/ui/Card";

const ComplaintDetail = () => {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useComplaintDetailPage(id);

	return (
		<Layout
			title={`${t("reklamaceCislo")}: ${
				!isLoading && data ? data.case_number : ""
			}`}
			header={
				<Link to="/reklamace" className="btn btn--primary">
					{t("zpetNaReklamace")}
				</Link>
			}
			isLoading={isLoading}>
			{!isLoading && (
				<div className="complaintPage--wrapper">
					<Card className="complaintPage--info">
						<ul>
							<li className="info">
								<strong>{t("nazev")}</strong>

								<span> {data.name} </span>
							</li>

							<li className="info">
								<strong>{t("datumZalozeni")}</strong>

								<span>{useDateString(data.date_create)}</span>
							</li>

							<li className="info">
								<strong>{t("datumPosledniZmeny")}</strong>

								<span> {useDateString(data.date_modified)} </span>
							</li>

							<li className="info">
								<strong>{t("stavReklamace")}</strong>

								<span dangerouslySetInnerHTML={{ __html: data.status }} />
							</li>
						</ul>
					</Card>

					<Card title={t("dokumenty")}>
						<ul>
							<li className="info">--</li>
							<li className="info">--</li>
						</ul>
					</Card>

					<Card title={t("popis")} className="complaintPage--desc">
						<p>{data.description ? data.description : t("zadnyPopis")}</p>
					</Card>

					<Card title={t("vyjadreni")} className="complaintPage--statement">
						<div>
							<div>
								<strong>{t("stav")}: </strong>
								{data.claim_status || ""}
							</div>

							<p>{data.claim_resolution || t("zadneVyjadreni")}</p>
						</div>
					</Card>
				</div>
			)}
		</Layout>
	);
};

export default ComplaintDetail;
