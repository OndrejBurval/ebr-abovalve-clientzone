import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
	onYearSelect: (year: number) => void;
};

const OrderTableFilter = ({ onYearSelect }: Props) => {
	const { t } = useTranslation();
	const [activeYear, setActiveYear] = useState<number | null>(null);

	const handleYearSelect = (year: number) => {
		if (year === activeYear) return;
		setActiveYear(year);
		onYearSelect(year);
	};

	const years = useMemo(() => {
		const year = new Date().getFullYear();
		return Array.from(
			new Array(year - 2014),
			(_, index) => year - index
		).sort();
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
		</div>
	);
};

export default OrderTableFilter;
