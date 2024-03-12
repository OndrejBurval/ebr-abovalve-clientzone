import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
	onYearSelect: (year: number | string) => void;
};

const OrderTableFilter = ({ onYearSelect }: Props) => {
	const { t } = useTranslation();
	const [activeYear, setActiveYear] = useState<number | null | string>(null);

	const handleYearSelect = (year: number | string) => {
		if (year === activeYear) return;
		setActiveYear(year);
		onYearSelect(year);
	};

	const years = useMemo(() => {
		const year = new Date().getFullYear();
		return Array.from(new Array(year - (year - 3)), (_, index) => year - index)
			.sort()
			.reverse();
	}, []);

	return (
		<div className="filter">
			<button
				className={`btn btn--all ${activeYear === 0 ? "active" : ""}`}
				onClick={() => handleYearSelect(0)}>
				{t("vse")}
			</button>

			{years.map((year) => (
				<button
					key={year}
					className="btn"
					data-active={activeYear === year}
					onClick={() => handleYearSelect(year)}>
					{year}
				</button>
			))}

			<button
				className="btn"
				data-active={activeYear === "archive"}
				onClick={() => handleYearSelect("archive")}>
				{t("archiv")}
			</button>
		</div>
	);
};

export default OrderTableFilter;
