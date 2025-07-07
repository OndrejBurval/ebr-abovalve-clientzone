import { useCallback, useEffect, useState } from "react";
import type Basket from "@/types/Basket";
import Product from "@/types/Product";

export type UseBasket = {
  items: Basket | [];
  add: (product: Product, quantity?: number) => void;
  addMultiple: (products: Product[]) => void;
  remove: (id: string, quantity?: "ONE" | "ALL") => void;
  clear: () => void;
  updateQuantity: (id: string, quantity?: number) => void;
  getTotalPrice: (basket: Product[], globalDiscount: number) => number;
  updateCertificate: (id: string, certificate: boolean) => void;
  loadBasket: () => Product[];
};

export const useBasket = (): UseBasket => {
  const [basket, setBasket] = useState<Basket | []>([]);

  useEffect(() => {
    setBasket(loadBasket());
  }, []);

  const loadBasket = useCallback(() => {
    const newSession = !document.cookie.includes("basket_session");

    if (newSession) {
      document.cookie = "basket_session=true; path=/";
      localStorage.removeItem("basket");
    }

    const basket = localStorage.getItem("basket");
    return basket ? JSON.parse(basket) : [];
  }, []);

  const saveBasket = useCallback(
    (data: Basket | null = null) => {
      const basketToSave = data ? data : basket;
      localStorage.setItem("basket", JSON.stringify(basketToSave));
      window.dispatchEvent(new CustomEvent("basket:update"));
    },
    [basket]
  );

  const add = useCallback(
    (product: Product, quantity = 1) => {
      setBasket((prevBasket) => {
        const index = prevBasket.findIndex((item) => item.id === product.id);

        if (index === -1) {
          const newBasket = [...prevBasket, { ...product, quantity }];
          saveBasket(newBasket);
          return newBasket;
        } else {
          const newBasket = [...prevBasket];
          const existingProduct = newBasket[index];
          newBasket[index] = {
            ...existingProduct,
            ...product,
            quantity: existingProduct.quantity + quantity,
          };
          saveBasket(newBasket);
          return newBasket;
        }
      });
    },
    [basket]
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number = 1) => {
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
    },
    [basket]
  );

  const updateCertificate = useCallback(
    (id: string, certificate: boolean) => {
      const index = basket.findIndex((item) => item.id === id);
      basket[index].certificate = certificate;
      setBasket([...basket]);
      saveBasket();
    },
    [basket]
  );

  const addMultiple = useCallback(
    (products: Product[]) => {
      const basketData = [...basket];

      products.forEach((product) => {
        const index = basketData.findIndex((item) => item.id === product.id);
        const quantity = product?.quantity || 1;

        if (index === -1) {
          basketData.push({ ...product, quantity });
        } else {
          const existingProduct = basketData[index];
          basketData[index] = {
            ...existingProduct,
            ...product,
            quantity: existingProduct.quantity + quantity,
          };
          saveBasket([...basket]);
        }
      });

      setBasket([...basketData]);
      saveBasket([...basketData]);
    },
    [basket]
  );

  const remove = useCallback(
    (id: string, quantity: "ONE" | "ALL" = "ONE") => {
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
    },
    [basket]
  );

  const clear = useCallback(() => {
    setBasket([]);
    localStorage.removeItem("basket");
  }, []);

  const getTotalPrice = useCallback(
    (basket: Product[], globalDiscount: number = 0) => {
      return basket.reduce((acc: number, item: Product) => {
        const price = item.price * (1 - globalDiscount / 100);
        const value = acc + price * item.quantity;
        return parseFloat(value.toFixed(2));
      }, 0);
    },
    []
  );

  return {
    items: basket,
    add,
    addMultiple,
    remove,
    clear,
    updateQuantity,
    updateCertificate,
    getTotalPrice,
    loadBasket,
  };
};
