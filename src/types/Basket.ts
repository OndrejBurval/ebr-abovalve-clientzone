import type Product from "./Product";

type Basket = (Product & { quantity: number })[] | [];

export default Basket;