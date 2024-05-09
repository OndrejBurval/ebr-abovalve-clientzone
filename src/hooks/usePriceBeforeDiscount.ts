import useCurrency from "@/hooks/useCurrency";

const usePriceAmountBeforeDiscount = (price: number, discount: number) => {
    return parseFloat((price / (1 - discount / 100)).toFixed(2));
};

const usePriceBeforeDiscount = (price: number, discount: number) => {
    return useCurrency(usePriceAmountBeforeDiscount(price, discount));
};



export {usePriceBeforeDiscount, usePriceAmountBeforeDiscount};