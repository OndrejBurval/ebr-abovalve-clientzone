import { useTranslation } from "react-i18next";
import usePhoneFormat from "@/hooks/usePhoneFormat";
import type User from "@/types/User";
import Skeleton from "./ui/Skeleton";

type Props = {
	isLoading?: boolean;
	user?: User;
};

const UserCard = ({ user, isLoading }: Props) => {
	const { t } = useTranslation();

	return (
		<div className="userCard">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 24 24">
				<path
					fill="#ee1d23"
					d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"
				/>
			</svg>

			{isLoading ? (
				<Skeleton />
			) : (
				<>
					<UserData {...user} />
					<h3>{t("vasObchodniZastupce")}</h3>
				</>
			)}
		</div>
	);
};

const UserData = (user: User) => {
	return (
		<>
			{user.name && <p>{`${user.first_name} ${user.last_name}`}</p>}
			{user.phone && (
				<a href={`tel:${user.phone.replace(/ /g, "")}`}>
					{usePhoneFormat(user.phone)}
				</a>
			)}
		</>
	);
};

export default UserCard;
