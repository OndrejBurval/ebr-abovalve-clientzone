type Account = {
    id: number;
    sugar_id: string;
    name: string;
    billing_city: string;
    billing_street: string;
    billing_zip: string;
    billing_country: string;
    shipping_city: string;
    shipping_street: string;
    shipping_zip: string;
    shipping_country: string;
    open_opportunities_count: number;
    phone_office: string;
    phone_alternate: string;
    ein: string;
    tin: string;
    vat_payer: boolean;
    extern_id: number;
    navision_code: string;
    price_group: string;
    payment_method: string;
    invoice_balance_due_total: number;
    date_modified: string;
    reg_id_c?: string;
    vat_id_c?: string;
    default_discount?: number;
}

export default Account;