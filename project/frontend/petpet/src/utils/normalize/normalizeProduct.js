import { IMAGES, DETAILS } from '@config/assetsConfig';

/**
 * Нормализует данные товара, добавляя fallback-значения.
 * Все новые поля опциональны - если их нет, используются дефолты.
 * 
 * @param {Object} product - Сырые данные товара
 * @returns {Object|null} - Нормализованные данные или null, если product пустой
 * 
 * @example
 * normalizeProduct({ id: '123', productImgPath: '/img.png' })
 * выходит { id: '123', productImgPath: '/img.png', productDescription: {...}, petType: [], ... }
 */
export function normalizeProduct(product) {
    if (!product || !product.id) return null;
    
    return {
        // Базовые поля (для карточки)
        id: product.id,
        productImgPath: product.productImgPath ?? IMAGES.NO_IMG,
        productDescription: {
            price: product.productDescription?.price ?? DETAILS.NO_PRICE,
            title: product.productDescription?.title ?? DETAILS.NO_DESCRIPTION,
            stars: product.productDescription?.stars ?? DETAILS.NO_STARS,
            reviewCount: product.productDescription?.reviewCount ?? DETAILS.NO_REVIEW,
        },
        
        // Новые поля (для страницы товара) - все опциональны
        category: product.category ?? 'other',
        
        // petType - массив, даже если пришёл один элемент
        petType: Array.isArray(product.petType) 
            ? product.petType 
            : (product.petType ? [product.petType] : []),
        
        inStock: product.inStock ?? true,
        
        // Описания - пустые строки, если не указаны
        shortDescription: product.shortDescription ?? '',
        fullDescription: product.fullDescription ?? '',
        
        // Массив фото - если нет, используем главное фото
        images: product.images?.length > 0 
            ? product.images 
            : [product.productImgPath ?? IMAGES.NO_IMG],
        
        // Детали товара (таблица размеров, состав и т.д.)
        details: product.details ?? { type: null, data: {} },
        
        // Вариации (размер, вес, упаковка)
        variations: product.variations ?? [],
        
        // Отзывы
        reviews: product.reviews ?? [],
    };
}