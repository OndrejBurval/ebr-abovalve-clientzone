type Document = {
    id: string | number,
    sugar_id: string,
    parent_sugar_id: string,
    name: string,
    description: string,
    type: string,
    filename: string,
    file_size: number,
    date_create: Date,
    date_modified: Date
};

export default Document;

