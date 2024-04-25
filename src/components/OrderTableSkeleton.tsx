import { useTranslation } from "react-i18next";
import Skeleton from "./ui/Skeleton";

const OrderTableSeleton = () => {
	const { t } = useTranslation();

	const numberOfColumns = 6;

	return (
		<table>
			<thead>
				<tr className="text-left">
					<th className="px-5" style={{ maxWidth: "90px" }}>
						{t("cisloObjednavky")}
					</th>
					{/**
						<th className="px-5" style={{ maxWidth: "130px" }}>
							{t("cisloObchodnighoPripadu")}
						</th>
                         */}
					<th className="px-5 min-w-28" style={{ maxWidth: "100px" }}>
						<div className="sortCol">{t("datum")}</div>
					</th>
					<th className="px-5">
						<div className="sortCol">{t("stav")}</div>
					</th>
					<th className="px-5">{t("faktura")}</th>
					<th className="px-5 text--right">
						<div className="sortCol">{t("cenaBezDph")}</div>
					</th>
					<th className="px-5" style={{ width: 188 }}></th>
				</tr>
			</thead>
			<tbody>
				{Array(3)
					.fill(null)
					.map((_, index) => (
						<tr key={index}>
							{Array(numberOfColumns)
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

export default OrderTableSeleton;
