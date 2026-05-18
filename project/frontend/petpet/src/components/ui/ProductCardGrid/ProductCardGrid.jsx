import classes from './styles/ProductCardGrid.module.css';

import ProductCard from '../ProductCard/ProductCard';

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
            {products.map((product) => (
                // TODO Если одинаково не будет пути до карточки, то произойдет сбой. Исправить
                <ProductCard key={product.productImgPath} data={product} />
            ))}
        </div>
    );
}