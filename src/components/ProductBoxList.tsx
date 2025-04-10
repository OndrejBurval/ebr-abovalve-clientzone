import useProducts from "@/hooks/useProducts";
import type ProductBox from "@/types/ProductBox";
import type CategoryBox from "@/types/CategoryBox";
import { useTranslation } from "react-i18next";
import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { useBasket, type UseBasket } from "@/hooks/useBasket";

type Context = {
  basket: UseBasket;
};
const ProductListContext = createContext<Context | null>(null);

const ProductBoxList = () => {
  const { t } = useTranslation();
  const { isLoading, data, loadMore, isFetching } = useProducts();
  const [products, setProducts] = useState<ProductBox[]>([]);
  const basket = useBasket();

  useEffect(() => {
    if (data) {
      setProducts((prev) => [...prev, ...data.products]);
    }
  }, [data, setProducts]);

  return (
    <ProductListContext.Provider value={{ basket }}>
      <section className="cCube cProductList cProductList--image js__productList--image _p _iA">
        {isLoading ? <div className="spinner"></div> : null}

        {!isLoading && data.categories && (
          <div className="cProductList">
            <div className="cProductList__categories">
              <ul className="grid">
                {data.categories.map((item: CategoryBox) => (
                  <CategoryItem key={item.id} category={item} />
                ))}
              </ul>
            </div>
          </div>
        )}

        {!isLoading && products && (
          <div className="grid">
            {products.map((item: ProductBox) => (
              <ProductItem
                key={item.id}
                product={item}
                discount={data.discountPercent}
              />
            ))}
          </div>
        )}

        {!isLoading && products.length < data.totalProducts && (
          <div className="productList--actions">
            <button className="btn" onClick={loadMore} disabled={isFetching}>
              {t("nacistDalsi")}
            </button>
          </div>
        )}
      </section>
    </ProductListContext.Provider>
  );
};

const CategoryItem = ({ category }: { category: CategoryBox }) => {
  const IMAGE_PLACEHOLDER =
    "/assets/frontend/abovalvemyebranacom/img/image.svg";

  return (
    <li className="cProductList__categories__item cProductList__categories__item--box desk--one-fifth lap--one-third palm--one-half">
      <a
        href={category.link}
        className="cProductList__categories__item__in cProductList__categories__item__in--box">
        <div className="cProductList__categories__img">
          <img src={category.image || IMAGE_PLACEHOLDER} />
        </div>

        <span className="cProductList__categories__title">{category.name}</span>
      </a>
    </li>
  );
};

const ProductItem = ({
  product,
  discount = null,
}: {
  product: ProductBox;
  discount?: number;
}) => {
  const { t } = useTranslation();

  const IMAGE_PLACEHOLDER = useMemo(
    () =>
      `/assets/frontend/${window.location.hostname.replace(
        /\./g,
        ""
      )}/img/image.svg`,
    []
  );

  return (
    <div className="grid__item desk--one-third lap--one-half palm--one-whole">
      <div className="cProductListImg">
        <div className="cProductListImg__img">
          <a href={product.link} className="cProductListImg__link">
            <img src={product.image || IMAGE_PLACEHOLDER} />
          </a>
        </div>

        <h3 className="cProductListImg__title">
          <a href={product.link}>{product.name}</a>
        </h3>

        <div className="cProductListImg__content">
          <div className="cProductListImg__prices">
            <div className="cProductListImg__item__in cProductListImg__price">
              <div className="cProductListImg__price">
                <div className="cProduct__price">
                  <span>{t("cenaZaKsBezDph")}</span>
                  <span className="price">{product.price_formatted}</span>
                  {!!discount && <span>{t("poSleve")}</span>}
                </div>
              </div>
            </div>
          </div>

          <ProductAvailability product={product} />

          <ProductBuy product={product} />
        </div>
      </div>
    </div>
  );
};

const ProductAvailability = ({ product }: { product: ProductBox }) => {
  return (
    <div className="cProductListImg__availability">
      <span
        className={`cAvailability ${
          product.stock > 0 ? "cAvailability--stock" : "cAvailability--nStock"
        }`}>
        {product.stock_text}
      </span>
    </div>
  );
};

const ProductBuy = ({ product }: { product: ProductBox }) => {
  const context = useContext(ProductListContext);
  const [count, setCount] = useState(1);
  const [certificate, setCertificate] = useState(false);

  const { t } = useTranslation();

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!context) return;

    context.basket.add({ ...product, certificate }, count);
    setCount(1);
    setTimeout(() => window.dispatchEvent(new CustomEvent("drawer:open")), 100);
  };

  return (
    <div className="cAddToCart">
      <div className="cAddToCart--inner">
        <input
          type="number"
          name="count"
          id="count"
          min={1}
          value={count}
          onChange={(e) => setCount(parseInt(e.currentTarget.value))}
        />
        <button type="submit" className="btn btn--default" onClick={handleBuy}>
          {t("koupit")}
        </button>
      </div>

      <div
        className="cAddToCart__certificate"
        onClick={(e) => {
          e.preventDefault();
          setCertificate(!certificate);
        }}>
        <span className="checkbox-design">
          <input
            name={`productCertificate-${product.id}`}
            type="checkbox"
            value="1"
            checked={certificate}
          />
          <label htmlFor={`productCertificate-${product.id}`}></label>
        </span>
        <label htmlFor={`productCertificate-${product.id}`}>
          {t("certifikat3")}
        </label>
        <span
          className="icon icon-info"
          data-toggle="tooltip"
          title={t("certifikat3Info")}></span>
      </div>
    </div>
  );
};

export default ProductBoxList;
