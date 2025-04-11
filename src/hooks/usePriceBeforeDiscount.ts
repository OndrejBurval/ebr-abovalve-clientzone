import useCurrency from "@/hooks/useCurrency";

const usePriceAmountBeforeDiscount = (
  price: number,
  discount: number,
  eshopDiscount?: number
) => {
  let originalPrice = price;

  if (discount && discount > 0) {
    originalPrice = parseFloat(
      (originalPrice / (1 - discount / 100)).toFixed(2)
    );
  }

  if (eshopDiscount && eshopDiscount > 0) {
    originalPrice = parseFloat(
      (originalPrice / (1 - eshopDiscount / 100)).toFixed(2)
    );
  }

  return originalPrice;
};

const usePriceBeforeDiscount = (
  price: number,
  discount: number,
  eshopDiscount?: number
) => {
  return useCurrency(
    usePriceAmountBeforeDiscount(price, discount, eshopDiscount)
  );
};

export { usePriceBeforeDiscount, usePriceAmountBeforeDiscount };
