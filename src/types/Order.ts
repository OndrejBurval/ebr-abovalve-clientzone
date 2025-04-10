import type Document from "./Document";

type Order = {
  id: number;
  state: string;
  sugar_id: string;
  navision_code: string;
  account_sugar_id: string;
  description: string;
  order_date: string;
  requested_delivery_date: string;
  promised_delivery_date: string;
  due_date: string;
  currency_code: string;
  total_without_vat: number;
  total_with_vat: number;
  total_vat: number;
  shipping_name: string;
  shipping_street: string;
  shipping_city: string;
  shipping_zip: string;
  shipping_country?: string;
  date_modified: string;
  shipment_date: string;
  order_number: string;
  documents: Document[];
  external_document_number?: string;
};

type OrderItem = {
  id: string;
  navision_code: string;
  navision_order_code: string;
  name: string;
  unit: string;
  quantity: number;
  total_cost: number;
  unit_cost: number;
  discount_percent?: number;
  certificate?: boolean;
};

export type { Order, OrderItem };
