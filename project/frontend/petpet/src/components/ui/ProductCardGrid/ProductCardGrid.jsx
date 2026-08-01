import { useMemo } from 'react';

import classes from './styles/ProductCardGrid.module.css';

import ProductCard from '@ui/ProductCard/ProductCard';

import { normalizeProduct } from '@utils/normalize';

// ! TODO: разбить этот компонент на service и use составляющие

export default function ProductCardGrid({isLoading = true, products}){
    const normalizedProducts = useMemo(() => {
        return products
            .map(normalizeProduct)
            .filter(Boolean); // Убираем null (если product.id не было)
    }, [products]);

    if(isLoading){
        return <div className={classes.info}>Загрузка товаров...</div>
    }

    if(!normalizedProducts || normalizedProducts.length === 0){
        return <div className={classes.info}>Товары не дошли!</div>
    }


    return(
        <div className={classes.product_grid}>
            {normalizedProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
            ))}
        </div>
    );
}