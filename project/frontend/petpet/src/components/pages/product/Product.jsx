import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import classes from './styles/Product.module.css';

import ProductGallery from '@features/ProductPage/ProductGallery/ProductGallery';
import ProductInfo from '@features/ProductPage/ProductInfo/ProductInfo';
import ProductVariations from '@features/ProductPage/ProductVariations/ProductVariations';
import ProductDetailsRenderer from '@features/ProductPage/ProductDetails/ProductDetailsRenderer';
import ProductReviews from '@features/ProductPage/ProductReviews/ProductReviews';

import { normalizeProduct } from '@utils/normalize/normalizeProduct';
import testData from '@data/store_test_data.json';

export default function Product() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    
    const urlVariationId = searchParams.get('variation');
    
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
                <ProductGallery images={product.images} />
                
                <div className={classes.info_column}>
                    <ProductInfo product={product} />
                    {product.variations.length > 0 && (
                        <ProductVariations 
                            productId={product.id}
                            variations={product.variations}
                            initialVariationId={urlVariationId}
                        />
                    )}
                </div>
            </div>
            
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