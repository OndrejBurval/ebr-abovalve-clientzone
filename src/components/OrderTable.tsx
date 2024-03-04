import type { Order } from "@/types/Order";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";

type Props = {
	items: Order[];
	hasMore?: boolean;
	isFetching?: boolean;
	onLoadMore?: () => void;
};

const OrderTable = ({ items, hasMore, isFetching, onLoadMore }: Props) => {
	const { t } = useTranslation();

	if (!items || items.length === 0) {
		return <p>{t("zadneObjednavky")}</p>;
	}

	return (
		<>
			<Table items={items} t={t} />

			{isFetching && (
				<div className="table--fetching">
					<div className="drawer--spinner"></div>
				</div>
			)}

			{onLoadMore && hasMore && (
				<div className="table--actions">
					<button className="btn" onClick={onLoadMore} disabled={isFetching}>
						{t("nacistDalsi")}
					</button>
				</div>
			)}
		</>
	);
};

const Table = ({
	items,
	t,
}: {
	items: Order[];
	t: TFunction<"translation", undefined>;
}) => {
	const getDateString = (date: string) => {
		const dateObj = new Date(date);
		return dateObj.toLocaleDateString("cs-CZ");
	};

	return (
		<div className="table--responsive">
			<table>
				<thead>
					<tr className="text-left">
						<th className="px-5"> {t("cisloObjednavky")} </th>
						<th className="px-5 min-w-28"> {t("datum")} </th>
						<th className="px-5"> {t("cena")} </th>
						<th className="px-5"> {t("stav")} </th>
						<th className="px-5"> {t("faktura")} </th>
						<th className="px-5"></th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td className="px-5"> {item.id} </td>
							<td className="px-5 min-w-28">
								{getDateString(item.order_date || "")}
							</td>
							<td className="px-5">
								{item.total_without_vat}&nbsp;{item.currency_code}
							</td>
							<td className="px-5"> {item.state} </td>
							<td className="px-5"> --- </td>
							<td className="px-5">
								<Link to={`/objednavka/${item.id}`}>
									<button className="btn btn--primary">{t("detail")}</button>
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OrderTable;
