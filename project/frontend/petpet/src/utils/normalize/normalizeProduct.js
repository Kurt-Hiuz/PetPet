import { IMAGES, DETAILS } from '@config/assetsConfig';

/**
 * Нормализует данные товара, добавляя fallback-значения
 * @param {Object} product - Сырые данные товара
 * @returns {Object|null} - Нормализованные данные или null, если product пустой
 * 
 * @example
 * normalizeProduct({ id: '123', productImgPath: '/img.png' })
 * выходит: { id: '123', productImgPath: '/img.png', productDescription: { price: -1, ... } }
 */
export function normalizeProduct(product) {
    if (!product || !product.id) return null;
    
    return {
        id: product.id,
        productImgPath: product.productImgPath ?? IMAGES.NO_IMG,
        productDescription: {
            price: product.productDescription?.price ?? DETAILS.NO_PRICE,
            title: product.productDescription?.title ?? DETAILS.NO_DESCRIPTION,
            stars: product.productDescription?.stars ?? DETAILS.NO_STARS,
            reviewCount: product.productDescription?.reviewCount ?? DETAILS.NO_REVIEW,
        }
    };
}