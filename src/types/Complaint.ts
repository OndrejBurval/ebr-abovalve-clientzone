type Complaint = {
    id: number;
    sugar_id: string;
    name: string;
    description: string;
    case_number: string;
    status: string;
    claim_status: string;
    claim_resolution: string;
    contact_id: string;
    date_create: string;
    date_update: string;
    type: string;
    date_modified: string;
} | unknown;

export default Complaint;
