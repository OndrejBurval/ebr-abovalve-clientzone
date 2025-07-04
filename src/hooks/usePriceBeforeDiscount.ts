import useCurrency from "@/hooks/useCurrency";
import calculateOriginalPrice from "@/utils/calcOriginalPrice";
import { useMemo } from "react";

const usePriceBeforeDiscount = (
  price: number,
  discount: number,
  eshopDiscount?: number
) => {
  const originalPrice = useMemo(() => {
    return calculateOriginalPrice(price, [discount, eshopDiscount]);
  }, [price, discount, eshopDiscount]);

  return useCurrency(originalPrice);
};

export { usePriceBeforeDiscount };
