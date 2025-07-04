import useCurrency from "@/hooks/useCurrency";

const usePriceAmountAfterDiscount = (price: number, discounts: number[]) => {
  let finalPrice = price;

  for (const discount of discounts) {
    finalPrice *= 1 - discount / 100;
  }

  return parseFloat(finalPrice.toFixed(2));
};

const usePriceAfterDiscount = (price: number, discounts: number[]) => {
  return useCurrency(usePriceAmountAfterDiscount(price, discounts));
};

export { usePriceAfterDiscount, usePriceAmountAfterDiscount };
