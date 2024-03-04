import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
	data: number[];
	onYearSelect: (year: number) => void;
};

const OrderTableFilter = ({ data, onYearSelect }: Props) => {
	const { t } = useTranslation();
	const [activeYear, setActiveYear] = useState<number | null>(null);

	const sortedData = useMemo(() => data.sort(), [data]);

	const handleYearSelect = (year: number) => {
		setActiveYear(year);
		onYearSelect(year);
	};

	return (
		<div className="filter">
			<button
				className={`btn btn--all ${activeYear === 0 ? "active" : ""}`}
				onClick={() => handleYearSelect(0)}>
				{t("vse")}
			</button>

			{sortedData.map((year) => (
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
