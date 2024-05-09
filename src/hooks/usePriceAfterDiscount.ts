import useCurrency from "@/hooks/useCurrency";

const usePriceAmountAfterDiscount = (price: number, discount: number) => {
    return price - price * discount / 100;
}

const usePriceAfterDiscount = (price: number, discount: number) => {
    return useCurrency(usePriceAmountAfterDiscount(price, discount));
}

export {usePriceAfterDiscount, usePriceAmountAfterDiscount};