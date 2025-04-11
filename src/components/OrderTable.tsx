import type { Order } from "@/types/Order";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import Skeleton from "./ui/Skeleton";
import useOrders from "@/hooks/useOrders";
import OrderTableSeleton from "./OrderTableSkeleton";
import OrderTableFilter from "./OrderTableFilter";
import { useState, useEffect } from "react";
import useCurrency from "@/hooks/useCurrency";
import type Document from "@/types/Document";

type Props = {
  showFilter?: boolean;
  infiniteLoading?: boolean;
  limit?: number;
  page?: string;
};

const OrderTable = ({ showFilter, limit, infiniteLoading, page }: Props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { t } = useTranslation();
  const {
    data,
    loadMore,
    isFetching,
    isLoading,
    setYearFilter,
    setSortFilter,
  } = useOrders(limit, page ? page : "default");

  useEffect(() => {
    if (data) {
      setOrders((oldValue) => [...oldValue, ...data.orders]);
    }
  }, [data]);

  const handleYearSelect = (year: number) => {
    setOrders([]);
    setYearFilter(year);
  };

  const handleSort = (field: string) => {
    setOrders([]);
    setSortFilter(field);
  };

  return (
    <>
      {showFilter && <OrderTableFilter onYearSelect={handleYearSelect} />}

      {isLoading ? (
        <OrderTableSeleton />
      ) : (
        <Table
          items={orders}
          t={t}
          isFetching={isFetching && !limit}
          onSort={handleSort}
        />
      )}

      {infiniteLoading && orders.length < data?.totalCount && (
        <div className="table--actions">
          <button className="btn" onClick={loadMore} disabled={isFetching}>
            {t("nacistDalsi")}
          </button>
        </div>
      )}
    </>
  );
};

const Table = ({
  items,
  isFetching,
  onSort,
  t,
}: {
  items: Order[];
  isFetching: boolean;
  onSort: (field: string) => void;
  t: TFunction<"translation", undefined>;
}) => {
  const getDateString = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("cs-CZ");
  };

  const getInvoice = (documents: Document[] | undefined) => {
    if (!documents || documents.length < 1) return "-";

    const invoice = documents.find((doc) => doc.type === "Invoice");
    if (!invoice) return "-";

    return (
      <a
        href={invoice.download_link}
        target="_blank"
        rel="noreferrer"
        style={{ fontSize: ".8rem", maxWidth: "8rem", display: "block" }}>
        {invoice.name}
      </a>
    );
  };

  return (
    <div className="table--responsive">
      <table>
        <thead>
          <tr className="text-left">
            <th className="px-5" style={{ maxWidth: "90px" }}>
              {t("cisloObjednavky")}
            </th>

            <th className="px-5" style={{ maxWidth: "90px" }}>
              {t("vaseReference")}
            </th>

            {/**
						<th className="px-5" style={{ maxWidth: "130px" }}>
							{t("cisloObchodnighoPripadu")}
						</th>
                         */}
            <th className="px-5 min-w-28" style={{ maxWidth: "100px" }}>
              <div className="sortCol">
                {t("datum")}
                <SortButton onClick={() => onSort("order_date")} />
              </div>
            </th>
            <th className="px-5">
              <div className="sortCol">
                {t("stav")}
                <SortButton onClick={() => onSort("state")} />
              </div>
            </th>
            <th className="px-5" style={{ width: "120px" }}>
              {t("predpokladanaDodavka")}
            </th>
            <th className="px-5" style={{ width: "120px" }}>
              {t("faktura")}
            </th>
            <th className="px-5 text--right">
              <div className="sortCol text--right">
                {t("cenaBezDph")}
                <SortButton onClick={() => onSort("total_without_vat")} />
              </div>
            </th>
            <th className="px-5" style={{ width: "150px" }}></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.account_sugar_id}>
              <td className="px-5" style={{ maxWidth: "90px" }}>
                {item.navision_code}
              </td>

              <td className="px-5">{item.external_document_number || "-"}</td>

              {/**
							<td className="px-5" style={{ maxWidth: "130px" }}>
								{item.order_number}
							</td>
                            */}
              <td className="px-5 min-w-28" style={{ maxWidth: "100px" }}>
                {getDateString(item.order_date || "")}
              </td>

              <td
                className="px-5 min-w-28"
                style={{ maxWidth: "100px" }}
                dangerouslySetInnerHTML={{ __html: item.state || "" }}
              />

              <td className="px-5">
                {" "}
                {getDateString(item.requested_delivery_date || "")}{" "}
              </td>

              <td className="px-5"> {getInvoice(item.documents)} </td>

              <td className="px-5 text--right">
                {useCurrency(item.total_without_vat, item.currency_code)}
              </td>
              <td className="px-5 actionCol" style={{ maxWidth: "113px" }}>
                <Link to={`/objednavka/${item.id}`}>
                  <button className="btn btn--primary">{t("detail")}</button>
                </Link>
                <Link to={`/objednavka/${item.id}?orderAgain=true`}>
                  <button className="btn btn--primary">
                    {t("objednatZnovu")}
                  </button>
                </Link>
              </td>
            </tr>
          ))}

          {isFetching && (
            <>
              <tr className="table--fetching">
                <td colSpan={6}>
                  <Skeleton />
                </td>
              </tr>
              <tr>
                <td colSpan={6}>
                  <Skeleton />
                </td>
              </tr>
            </>
          )}

          {!isFetching && items.length < 1 && (
            <tr>
              <td colSpan={6}>
                <p>{t("zadneObjednavky")}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const SortButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick} className="btn--sort">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32">
        <path
          fill="#fff"
          d="m16 28l-7-7l1.41-1.41L16 25.17l5.59-5.58L23 21zm0-24l7 7l-1.41 1.41L16 6.83l-5.59 5.58L9 11z"
        />
      </svg>
    </button>
  );
};

export default OrderTable;
