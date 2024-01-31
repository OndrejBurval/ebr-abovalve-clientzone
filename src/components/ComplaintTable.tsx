import { useTranslation } from "react-i18next";
import Skeleton from "@/components/ui/Skeleton";
import type Complaint from "@/types/Complaint";
import { Link } from "react-router-dom";

type Props = {
	items?: Complaint[];
	isLoading?: boolean;
};

const ComplaintTable = ({ items, isLoading }: Props) => {
	const { t } = useTranslation();

	if ((!items || items.length === 0) && !isLoading) {
		return <p> {t("zadneReklamace")} </p>;
	}

	return (
		<table>
			<thead className="text-left">
				<tr>
					<th> {t("cisloReklamace")} </th>
					<th> {t("nazev")} </th>
					<th> {t("datumZalozeni")} </th>
					<th> {t("datumUzavreni")} </th>
					<th> {t("stavReklamace")} </th>
					<th> </th>
				</tr>
			</thead>

			<tbody>
				{!isLoading &&
					items.map((_, index) => (
						<tr key={index}>
							<td> -- </td>
							<td> -- </td>
							<td> -- </td>
							<td> -- </td>
							<td> -- </td>
							<td>
								<Link to="/reklamace/1">{t("detail")}</Link>
							</td>
						</tr>
					))}

				{isLoading &&
					Array(3)
						.fill(null)
						.map((_, index) => (
							<tr key={index}>
								{Array(6)
									.fill(null)
									.map((_, innerIndex) => (
										<td key={innerIndex}>
											<Skeleton />
										</td>
									))}
							</tr>
						))}
			</tbody>
		</table>
	);
};

export default ComplaintTable;