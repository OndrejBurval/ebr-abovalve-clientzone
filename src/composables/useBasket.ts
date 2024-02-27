import { useState } from "react";
import type Basket from "@/types/Basket";
import Product from "@/types/Product";

export const useBasket = () => {
    const [basket, setBasket] = useState<Basket | []>(loadBasket());
    
    function loadBasket() {
        const newSession = !document.cookie.includes("basket");

        if (newSession) {
            document.cookie = "basket=true";
            localStorage.removeItem("basket");
        }

        const basket = localStorage.getItem("basket");
        return basket ? JSON.parse(basket) : [];
    }

    function saveBasket(data: Basket | null = null) {
        const basketToSave = data ? data : basket;
        localStorage.setItem("basket", JSON.stringify(basketToSave));
    }

    function add(product: Product, quantity = 1) {
        const index = basket.findIndex((item) => item.id === product.id);

        if (index === -1) {
            setBasket(() => {
                saveBasket([...basket, { ...product, quantity }])
                return [...basket, { ...product, quantity }]}
            );
        } else {
            basket[index].quantity += quantity;
            setBasket([...basket]);
            saveBasket();
        }
    }

    function addQuantity(id: number, quantity: number = 1) {
        if (!quantity || quantity < 1) {
            return;
        }

        const index = basket.findIndex((item) => item.id === id);

        if (index === -1) {
            console.error("Item not found in basket");
            return;
        }

        basket[index].quantity = quantity;
        setBasket([...basket]);
        saveBasket();
    }

    function addMultiple(products: Product[]) {
        const basketData = [...basket];

        products.forEach((product) => {
            const index = basketData.findIndex((item) => item.id === product.id);
            const quantity = product?.quantity || 1;

            if (index === -1) {
                basketData.push({ ...product, quantity });
            } else {
                basketData[index].quantity += quantity;
            }
        });

        setBasket([...basketData]);
        saveBasket([...basketData]);
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
        addMultiple,
        remove,
        clear,
        addQuantity
    };
}