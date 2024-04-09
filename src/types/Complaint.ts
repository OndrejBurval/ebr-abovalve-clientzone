type Complaint = {
    id: number;
    sugar_id: string;
    name: string;
    description: string;
    case_number: string;
    contact_id: string;
    date_create: string;
    date_update: string;
    type: string;
    date_modified: string;
    date_closed: string;
    claim_result: string;
    documents: any[];
};

export default Complaint;