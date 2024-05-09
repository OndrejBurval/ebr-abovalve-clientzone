import Product from "@/types/Product";

const useDiscount = (product: Product, accountDiscount: number) => {
    if (product.discount && product.discount > 0) return product.discount;
    if (accountDiscount && accountDiscount > 0) return accountDiscount;
    return 0;
};

export default useDiscount;