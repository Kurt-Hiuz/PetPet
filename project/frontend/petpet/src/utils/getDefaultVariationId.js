/**
 * Возвращает ID вариации по умолчанию для товара.
 * Логика:
 * 1. Если есть вариации — берём первую доступную (inStock === true)
 * 2. Если нет вариаций или все недоступны — возвращаем productId
 * 
 * Это гарантирует, что ProductCard и ProductInfo используют одинаковый variationId.
 * 
 * @param {Object} product - Нормализованный продукт
 * @returns {string} - ID вариации или productId
 * 
 * @example
 * getDefaultVariationId({ id: 'prod_001', variations: [{ id: 'v1', inStock: true }] })
 *  -> 'v1'
 * 
 * getDefaultVariationId({ id: 'prod_001', variations: [] })
 *  -> 'prod_001'
 */
export function getDefaultVariationId(product) {
    if (!product?.id) return null;
    
    const variations = product.variations || [];
    const availableVariation = variations.find(v => v.inStock);
    
    return availableVariation?.id || product.id;
}