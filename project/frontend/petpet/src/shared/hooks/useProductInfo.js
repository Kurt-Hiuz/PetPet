import { useProductVariationsStore } from '@shared/store/productVariationsStore';
import { useCartStore } from '@shared/store/cartStore';

/**
 * Хук для получения данных и действий ProductInfo.
 * Инкапсулирует работу с Zustand store, чтобы компонент оставался чистым UI.
 * 
 * ВАЖНО: Все хуки вызываются ДО условных возвратов (правило React).
 * 
 * @param {Object|null} product - Нормализованный продукт из normalizeProduct()
 * @returns {Object|null} - Данные для ProductInfo или null, если product пустой
 * 
 * @example
 * const info = useProductInfo(product);
 * if (!info) return null;
 * return <ProductInfo info={info} />;
 */
export function useProductInfo(product) {
    // 1. ВСЕ хуки вызываем СРАЗУ, независимо от product
    // Селекторы защищены от null через тернарный оператор
    const selectedVariationId = useProductVariationsStore(
        state => product ? state.variations[product.id] : undefined
    );
    
    const cartItems = useCartStore(state => state.items);
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeItem);
    
    // 2. Проверка product - ПОСЛЕ всех хуков
    if (!product) return null;
    
    // 3. Деструктурируем product
    const { 
        id: productId, 
        productDescription, 
        variations, 
        images,
        shortDescription,
        inStock,
    } = product;
    
    const { 
        title, 
        price: basePrice, 
        stars: rating, 
        reviewCount 
    } = productDescription;
    
    // 4. Вычисляем текущую вариацию
    const currentVariation = variations.find(v => v.id === selectedVariationId)
        || variations.find(v => v.inStock);
    
    const variationId = currentVariation?.id || productId;
    const currentPrice = currentVariation?.price ?? basePrice;
    const image = images[0];
    const variationLabel = currentVariation?.label;
    
    // 5. Проверяем корзину
    const cartQuantity = cartItems[`${productId}__${variationId}`]?.quantity || 0;
    const isInCart = cartQuantity > 0;
    
    // 6. Валидация
    const hasPrice = currentPrice != null && currentPrice >= 0;
    const hasRating = rating != null && rating >= 0;
    const hasReviews = reviewCount != null && reviewCount >= 0;
    
    // 7. Возвращаем объект со всеми данными и действиями
    return {
        // Данные для отображения
        title,
        price: currentPrice,
        rating,
        reviewCount,
        shortDescription,
        inStock,
        image,
        variationLabel,
        
        // Состояние корзины
        isInCart,
        cartQuantity,
        
        // Валидация
        hasPrice,
        hasRating,
        hasReviews,
        
        // Идентификаторы
        productId,
        variationId,
        
        // Действия (actions)
        updateQuantity,
        removeItem,
    };
}