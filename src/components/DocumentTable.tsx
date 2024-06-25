import { useTranslation } from "react-i18next";
import type Document from "@/types/Document";

type Props = {
	files: Document[];
};

const DocumentTable = ({ files }: Props) => {
	const { t } = useTranslation();

	return (
		<div className="table--responsive">
			<table>
				<thead className="text-left">
					<tr>
						<th>{t("typ")}</th>
						<th>{t("soubor")}</th>
					</tr>
				</thead>

				<tbody>
					{files.map((file, index) => (
						<tr key={index}>
							<td>{t(file.type)}</td>
							<td>
								<a href={file.download_link} target="_blank" rel="noreferrer">
									{file.filename}
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DocumentTable;
