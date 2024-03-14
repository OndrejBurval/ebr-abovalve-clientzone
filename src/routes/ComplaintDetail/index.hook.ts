import type Complaint from "@/types/Complaint";
import { useEffect } from "react";

import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const getComplaint = async (id: number | string): Promise<Complaint> => {
    const res = await fetch(`/api/platform/custom/complaint/${id}${import.meta.env.DEV ? '.json' : ''}`)

    if (!res.ok) {
        throw new Error('Orders network response error')
    }

    return await res.json();
};
const useComplaintDetailPage = (id: number | string) => {
	const navigate = useNavigate();

	const { data, isFetched, isLoading } = useQuery({
        queryKey: `complaint-${id}`,
        queryFn: () => getComplaint(id),
        retry: false
    });

    
	useEffect(() => {
		if (isFetched && !data) {
			alert("Reklamace nenalezena");
			navigate("/reklamace");
		}
	}, [isFetched, data, navigate]);

	return { data, isFetched, isLoading };
};

export { useComplaintDetailPage };
