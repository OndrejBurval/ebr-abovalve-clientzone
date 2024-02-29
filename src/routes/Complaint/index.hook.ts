import type Complaint from "@/types/Complaint";

import { useQuery } from "react-query";

const getComplaints = async (): Promise<Complaint[]> => {
    const res = await fetch(`/api/platform/custom/complaints${import.meta.env.DEV ? '.json' : ''}`)

    if (!res.ok) {
        throw new Error('Orders network response error')
    }

    const data = await res.json()
    return data.map((item) => item.complaint);
};

const useComplaintPage = () => {
	return useQuery(`complaints`, getComplaints);
};

export { useComplaintPage };
