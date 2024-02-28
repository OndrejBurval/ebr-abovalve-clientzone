import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

type Props = {
	link?: string;
};

const Pen = ({ link }: Props) => {
	const { t } = useTranslation();

	const svg =
		'<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg>';
	if (link) {
		return (
			<Tooltip title={t("upravitUdaje")}>
				<a
					className="icon-pen"
					href={link}
					dangerouslySetInnerHTML={{ __html: svg }}
				/>
			</Tooltip>
		);
	}

	return (
		<span className="icon-pen" dangerouslySetInnerHTML={{ __html: svg }} />
	);
};

export default Pen;
