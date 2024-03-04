import type Complaint from "@/types/Complaint";

import { useQuery } from "react-query";

const getComplaints = (): Promise<Complaint[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(null as any);
		}, 500);
	});
};
const useComplaintPage = () => {
	const { data, isFetched, isLoading } = useQuery(`complaints`, getComplaints);

	return { data, isFetched, isLoading };
};

export { useComplaintPage };
