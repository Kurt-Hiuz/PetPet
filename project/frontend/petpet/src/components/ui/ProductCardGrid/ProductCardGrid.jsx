import classes from './styles/ProductCardGrid.module.css';

import ProductCard from '@ui/ProductCard/ProductCard';

import { IMAGES, DETAILS } from '@config/assetsConfig';

// ! TODO: разбить этот компонент на service и use составляющие

export default function ProductCardGrid({isLoading = true, products}){
    if(isLoading){
        return <div className={classes.info}>Загрузка товаров...</div>
    }

    if(!products || products.length === 0){
        return <div className={classes.info}>Товары не дошли!</div>
    }

    return(
        <div className={classes.product_grid}>
            {products.map((product) => {
                const normalizedProduct = {
                    id: product.id,
                    productImgPath: product.productImgPath ?? IMAGES.NO_IMG,
                    productDescription: {
                        price: product.productDescription?.price ?? DETAILS.NO_PRICE,
                        title: product.productDescription?.title ?? DETAILS.NO_DESCRIPTION,
                        stars: product.productDescription?.stars ?? DETAILS.NO_STARS,
                        reviewCount: product.productDescription?.reviewCount ?? DETAILS.NO_REVIEW
                    }
                };

                return <ProductCard key={product.id} data={normalizedProduct} />
            })}
        </div>
    );
}