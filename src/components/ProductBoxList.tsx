import useProducts from "@/hooks/useProducts";
import type ProductBox from "@/types/ProductBox";
import type CategoryBox from "@/types/CategoryBox";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const ProductBoxList = () => {
	const { t } = useTranslation();
	const { isLoading, data, loadMore, isFetching } = useProducts();
	const [products, setProducts] = useState<ProductBox[]>([]);

	useEffect(() => {
		if (data) {
			setProducts((prev) => [...prev, ...data.products]);
		}
	}, [data, setProducts]);

	return (
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
						<ProductItem key={item.id} product={item} />
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

const ProductItem = ({ product }: { product: ProductBox }) => {
	const IMAGE_PLACEHOLDER =
		"/assets/frontend/abovalvemyebranacom/img/image.svg";

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
								<div className="cProduct__price cProduct__price--incVat">
									{product.price_formatted}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductBoxList;
