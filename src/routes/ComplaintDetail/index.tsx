import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useComplaintDetailPage } from "./index.hook";
import { useDateString } from "@/hooks/useDateString";
import { Link } from "react-router-dom";
import Layout from "@/layout";
import Card from "@/components/ui/Card";
import Breadcrumb from "@/components/Breadcrumb";

const ComplaintDetail = () => {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const { data, isLoading } = useComplaintDetailPage(id);

	return (
		<Layout
			title={`${t("reklamaceCislo")}: ${
				!isLoading && data ? data.complaint.case_number : ""
			}`}
			header={
				<Link to="/reklamace" className="btn btn--primary">
					{t("zpetNaReklamace")}
				</Link>
			}
			isLoading={isLoading}>
			<Breadcrumb
				links={[
					{
						href: `/reklamace`,
						label: t("reklamace"),
					},
					{
						href: `/reklamace/${data.complaint?.id || ""}`,
						label: data.complaint.case_number || "",
					},
				]}
			/>

			{!isLoading && (
				<div className="complaintPage--wrapper">
					<Card className="complaintPage--info">
						<ul>
							<li className="info">
								<strong>{t("nazev")}</strong>

								<span> {data.complaint.name} </span>
							</li>

							<li className="info">
								<strong>{t("datumZalozeni")}</strong>

								<span>{useDateString(data.complaint.date_create)}</span>
							</li>

							<li className="info">
								<strong>{t("datumPosledniZmeny")}</strong>

								<span> {useDateString(data.complaint.date_modified)} </span>
							</li>

							<li className="info">
								<strong>{t("stavReklamace")}</strong>

								<span
									dangerouslySetInnerHTML={{ __html: data.complaint.status }}
								/>
							</li>
						</ul>
					</Card>

					<Card title={t("dokumenty")}>
						<ul>
							{data.documents.length > 0 ? (
								data.documents.map(({ document, link }) => (
									<li key={document.id}>
										<a href={link} target="_blank">
											<strong>{document.name}</strong>
										</a>
									</li>
								))
							) : (
								<li>{t("zadneDokumenty")}</li>
							)}
						</ul>
					</Card>

					<Card title={t("popis")} className="complaintPage--desc">
						<p>
							{data.complaint.description
								? data.complaint.description
								: t("zadnyPopis")}
						</p>
					</Card>

					<Card title={t("vyjadreni")} className="complaintPage--statement">
						<div>
							<div>
								<strong>{t("stav")}: </strong>
								{data.complaint.claim_status || ""}
							</div>

							<p>{data.complaint.claim_resolution || t("zadneVyjadreni")}</p>
						</div>
					</Card>
				</div>
			)}
		</Layout>
	);
};

export default ComplaintDetail;
