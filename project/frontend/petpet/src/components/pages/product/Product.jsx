import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import classes from './styles/Product.module.css';

import ProductGallery from '@features/ProductPage/ProductGallery/ProductGallery';
import ProductInfo from '@features/ProductPage/ProductInfo/ProductInfo';
import ProductVariations from '@features/ProductPage/ProductVariations/ProductVariations';
import ProductDetailsRenderer from '@features/ProductPage/ProductDetails/ProductDetailsRenderer';
import ProductReviews from '@features/ProductPage/ProductReviews/ProductReviews';

import { normalizeProduct } from '@utils/normalize/normalizeProduct';

import testData from '@data/store_test_data.json';

/**
 * Страница товара. Композиционный слой - собирает фичи в единый layout.
 * @todo Когда появится API - заменить testData на useQuery
 */
export default function Product() {
    const { id } = useParams();
    
    // Временное решение: ищем товар в тестовых данных
    // Позже заменим на: const { data: product, isLoading } = useQuery(...)
    const product = useMemo(() => {
        const raw = testData.find(p => p.id === id);
        return raw ? normalizeProduct(raw) : null;
    }, [id]);
    
    if (!product) {
        return (
            <div className={classes.not_found}>
                <h2>Товар не найден</h2>
                <p>Возможно, он был удалён или перемещён</p>
            </div>
        );
    }
    
    return (
        <article className={classes.product_page}>
            <div className={classes.main_content}>
                {/* Левая колонка: галерея */}
                <ProductGallery images={product.images} />
                
                {/* Правая колонка: инфо + вариации */}
                <div className={classes.info_column}>
                    <ProductInfo 
                        title={product.productDescription.title}
                        price={product.productDescription.price}
                        rating={product.productDescription.stars}
                        reviewCount={product.productDescription.reviewCount}
                        shortDescription={product.shortDescription}
                        inStock={product.inStock}
                    />
                    {product.variations.length > 0 && (
                        <ProductVariations 
                            productId={product.id}
                            variations={product.variations}
                        />
                    )}
                </div>
            </div>
            
            {/* Блоки на всю ширину */}
            <ProductDetailsRenderer 
                type={product.details.type}
                data={product.details.data}
            />
            <ProductReviews 
                reviews={product.reviews}
            />
        </article>
    );
}