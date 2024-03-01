type Contact = {
    id: number;
    sugar_id: string;
    name: string;
    surname: string;
    title: string;
    phone: string;
    email?: string;
    portal_active: boolean;
    assigned_user_id: string;
    extern_id: string;
    account_sugar_id: string;
    date_modified: string;
    portal_priv_admin?: boolean;
}

export default Contact;