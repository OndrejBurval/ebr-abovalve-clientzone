import { useState } from "react";
import type Basket from "@/types/Basket";
import Product from "@/types/Product";

export const useBasket = () => {
    const [basket, setBasket] = useState<Basket | []>(loadBasket());
    
    function loadBasket() {
        const basket = localStorage.getItem("basket");
        return basket ? JSON.parse(basket) : [];
    }

    function saveBasket(data: Basket | null = null) {
        const basketToSave = data ? data : basket;
        localStorage.setItem("basket", JSON.stringify(basketToSave));
        console.log("Basket saved - ", basket, data)
    }

    function add(product: Product, quantity = 1) {
        const index = basket.findIndex((item) => item.id === product.id);

        if (index === -1) {
            setBasket(() => {
                saveBasket([...basket, { ...product, quantity }])
                return [...basket, { ...product, quantity }]}
            );
        } else {
            console.log("Item already in basket, updating quantity");
            basket[index].quantity += quantity;
            setBasket([...basket]);
            saveBasket();
        }
    }

    function remove(id: number, quantity: "ONE" | "ALL" = "ONE") {
        const index = basket.findIndex((item) => item.id === id);

        if (index === -1) {
            console.error("Item not found in basket");
            return;
        }

        const lastItem = basket[index].quantity === 1;

        if (quantity === "ALL" || lastItem) {
            basket.splice(index, 1);
        }

        if (quantity === "ONE" && !lastItem) {
            basket[index].quantity -= 1;
        }

        setBasket([...basket]);
        saveBasket();
    }

    function clear() {
        setBasket([]);
        localStorage.removeItem("basket");
    }

    return {
        items: basket,
        add,
        remove,
        clear
    };
}