import type Product from "@/types/Product";
import { useTranslation } from "react-i18next";

type Props = {
  items: Product[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};
const BasketTable = ({ items, onQuantityChange, onRemove }: Props) => {
  const { t } = useTranslation();

  const getTotalPrice = () => {
    if (items.some((item) => item.price === 0)) {
      return t("naDotaz");
    }

    return (
      items.reduce((acc, item) => acc + item.price * item.quantity, 0) + " Kč"
    );
  };

  if (items.length === 0) {
    return <h2 className="basket--empty">{t("kosikJePrazdny")}</h2>;
  }

  return (
    <div className="table">
      <table>
        <thead>
          <tr className="text-left">
            <th className="col-sm">{t("kodProduktu")}</th>
            <th>{t("nazev")}</th>
            <th className="col-md">{t("mnozstvi")}</th>
            <th className="col-md">{t("cenaZaKus")}</th>
            <th className="col-remove"></th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="col-sm">{item.id}</td>
              <td>{item.name}</td>
              <td className="col-md">
                <input
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (isNaN(value) || value < 1) {
                      e.currentTarget.value = "1";
                    }
                    onQuantityChange(
                      item.id,
                      isNaN(value) || value < 1 ? 1 : value
                    );
                  }}
                  type="number"
                  min={1}
                  step={1}
                  defaultValue={item.quantity}
                  name={`quantity-${item.id}`}
                  id={`quantity-${item.id}`}
                />
              </td>
              <td className="col-md">
                {item.price === 0 ? t("naDotaz") : `${item.price} Kč`}
              </td>
              <td className="col-remove">
                <button
                  className="btn btn--remove"
                  onClick={() => onRemove(item.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={3}>
              <strong>{t("celkem")}</strong>
            </td>
            <td colSpan={2}>
              <strong>{getTotalPrice()}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BasketTable;
