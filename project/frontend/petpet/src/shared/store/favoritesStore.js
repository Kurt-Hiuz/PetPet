import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * @typedef {Object} ProductData
 * @property {string} id
 * @property {string} productImgPath
 * @property {Object} productDescription
 * @property {number} productDescription.price
 * @property {string} productDescription.title
 * @property {number} productDescription.stars
 * @property {number} productDescription.reviewCount
 */

export const useFavoritesStore = create(
    persist(
        (set, get) => ({
            /** @type {string[]} */
            favoriteIds: [],
            
            /** @type {Object<string, ProductData>} */
            cachedProducts: {},
            
            /**
             * Переключить статус избранного
             * @param {string} productId
             * @param {ProductData} [productData] - Полные данные товара (опционально)
             */
            toggleFavorite: (productId, productData = null) => {
                const { favoriteIds, cachedProducts } = get();
                const isFavorite = favoriteIds.includes(productId);
                
                if (isFavorite) {
                    // Удаляем из избранного
                    const { [productId]: _, ...restCached } = cachedProducts;
                    set({
                        favoriteIds: favoriteIds.filter(id => id !== productId),
                        cachedProducts: restCached
                    });
                } else {
                    // Добавляем в избранное
                    set({
                        favoriteIds: [...favoriteIds, productId],
                        // Сохраняем в кэш, если данные переданы
                        cachedProducts: productData
                            ? { ...cachedProducts, [productId]: productData }
                            : cachedProducts
                    });
                }
            },
            
            /**
             * Получить все избранные товары (для страницы избранного)
             * @returns {ProductData[]}
             */
            getFavoriteProducts: () => {
                const { favoriteIds, cachedProducts } = get();
                return favoriteIds
                    .map(id => cachedProducts[id])
                    .filter(Boolean); // Убираем undefined (если товара нет в кэше)
            },
            
            /**
             * Проверка: является ли товар избранным
             * @param {string} productId
             * @returns {boolean}
             */
            isFavorite: (productId) => {
                return get().favoriteIds.includes(productId);
            },
            
            /**
             * Очистить всё избранное
             */
            clearFavorites: () => set({ favoriteIds: [], cachedProducts: {} }),
        }),
        {
            name: 'petpet-favorites', // ключ в localStorage
        }
    )
);