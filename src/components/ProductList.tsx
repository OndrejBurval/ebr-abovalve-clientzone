import ProductComponent from "@/components/Product";
import Card from "@/components/ui/Card";

import { useTranslation } from "react-i18next";
import type ProductType from "@/types/Product";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useCurrency from "@/hooks/useCurrency";
import { memo } from "react";
import { useBasket } from "@/hooks/useBasket";
import { useUserData } from "@/hooks/useUserData";

type CommonProps = {
  discount?: number;
};

type InteractiveProps = CommonProps & {
  interactive: true;
};

type NonInteractiveProps = CommonProps & {
  interactive?: false;
};

type Props = InteractiveProps | NonInteractiveProps;

const ProductList = ({ interactive, discount }: Props) => {
  const [parent] = useAutoAnimate();
  const { t } = useTranslation();
  const { items, updateQuantity, remove } = useBasket();
  const { userData } = useUserData();
  const { globalDiscount } = userData;

  const getTotalPrice = (incVat = false) => {
    if (!items || items.length === 0) return;
    const products = items as ProductType[];
    const value = products.reduce((acc: number, item: ProductType) => {
      const unitPrice = incVat ? item.price * 1.21 : item.price;
      return acc + unitPrice * item.quantity;
    }, 0);

    return useCurrency(value);
  };

  const list = items.map((product) => {
    return (
      <ProductComponent
        key={product.id}
        product={product}
        accountDiscount={discount || 0}
        eshopDiscount={globalDiscount || 0}
        interactive={interactive}
        onQuantityChange={interactive ? updateQuantity : undefined}
        onRemove={interactive ? remove : undefined}
      />
    );
  });

  return (
    <Card title={t("produkty")} className="productList">
      <table className="product-table" ref={parent}>
        <thead>
          <tr>
            <th>{t("kodProduktu")}</th>

            <th style={{ minWidth: "10rem" }}>{t("polozka")}</th>

            <th className=" text--right">{t("cenaBezDph")}</th>

            <th className=" text--right" style={{ width: "4rem" }}>
              {t("sleva")}
            </th>

            <th style={{ minWidth: "8rem" }} className=" text--right">
              {t("eshopSleva")}
            </th>

            <th style={{ width: "8rem" }}>
              {t("certifikat3")}
              <span
                className="icon icon-info"
                data-toggle="tooltip"
                data-title={t("certifikat3Info")}></span>
            </th>

            <th style={{ width: "5rem" }}>{t("pocetKs")}</th>

            <th className="text--right" style={{ minWidth: "8rem" }}>
              {t("cenaBezDphPoSleve")}
            </th>

            <th style={{ minWidth: "8rem" }} className="text--right">
              {t("cenaBezDphPoSleveCelkem")}
            </th>

            {interactive && <th></th>}
          </tr>
        </thead>

        <tbody>
          {list}
          <tr>
            <td colSpan={interactive ? 8 : 7}>
              <strong>{t("celkemBezDphOrientacni")}</strong>
            </td>
            <td className="text--right">
              <strong>{getTotalPrice()}</strong>
            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={interactive ? 8 : 7}>
              <strong>{t("celkemOrientacni")}</strong>
            </td>
            <td className="text--right">
              <strong>{getTotalPrice(true)}</strong>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default memo(ProductList);
