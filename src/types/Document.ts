type Document = {
    id: number;
    sugar_id: string;
    parent_sugar_id: string;
    name: string;
    description: string;
    type: string;
    filename: string;
    file_size: number;
    date_create: string;
    date_modified: string;
    download_link?: string;
};

export default Document;

