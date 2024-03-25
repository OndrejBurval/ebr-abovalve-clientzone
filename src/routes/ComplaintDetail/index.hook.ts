import type Complaint from "@/types/Complaint";
import type Document from "@/types/Document";
import { useEffect } from "react";

import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

type ComplaintDetailPageRes = {
    complaint: Complaint;
    documents: { document:  Document, link: string }[];
}

const getComplaint = async (id: number | string): Promise<ComplaintDetailPageRes> => {
    const res = await fetch(`/api/platform/custom/complaint/${id}${import.meta.env.DEV ? '.json' : ''}`)

    if (!res.ok) {
        throw new Error('Orders network response error')
    }

    const data: { complaint: Complaint, documents: { document:  Document, link: string }[] } = await res.json()
    return data;
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
