import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Skeleton from "@/components/ui/Skeleton";
import type Complaint from "@/types/Complaint";
import { useDateString } from "@/hooks/useDateString";

type Props = {
	items: Complaint[];
	isLoading?: boolean;
};

const ComplaintTable = ({ items, isLoading }: Props) => {
	const { t } = useTranslation();

	if ((!items || items.length === 0) && !isLoading) {
		return t("zadneReklamace");
	}

	return (
		<div className="table--responsive">
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

				{(!items || items.length === 0) && !isLoading ? (
					<tbody>
						<tr>
							<td colSpan={6}>{t("zadneReklamace")}</td>
						</tr>
					</tbody>
				) : (
					<tbody>
						{!isLoading &&
							items.map((item, index) => (
								<tr key={index}>
									<td> {item.case_number} </td>
									<td> {item.name} </td>
									<td>{useDateString(item.date_create)}</td>
									<td>-</td>
									<td dangerouslySetInnerHTML={{ __html: item.status }} />
									<td>
										<Link className="btn" to={`/reklamace/${item.id} `}>
											{t("detail")}
										</Link>
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
				)}
			</table>
		</div>
	);
};

export default ComplaintTable;
