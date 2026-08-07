import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Store для хранения выбранных вариаций товаров.
 * Ключ - productId, значение - id выбранной вариации.
 * 
 * @example
 * variations: { 'prod_001': 'v2', 'prod_002': 'v1' }
 */
export const useProductVariationsStore = create(
    persist(
        (set, get) => ({
            /** @type {Object<string, string>} */
            variations: {},
            
            /**
             * Установить выбранную вариацию для товара
             * @param {string} productId
             * @param {string} variationId
             */
            setVariation: (productId, variationId) => {
                set(state => ({
                    variations: {
                        ...state.variations,
                        [productId]: variationId
                    }
                }));
            },
            
            /**
             * Получить выбранную вариацию для товара
             * @param {string} productId
             * @returns {string|undefined}
             */
            getVariation: (productId) => {
                return get().variations[productId];
            },
            
            /**
             * Очистить выбор для товара
             * @param {string} productId
             */
            clearVariation: (productId) => {
                set(state => {
                    const { [productId]: _, ...rest } = state.variations;
                    return { variations: rest };
                });
            }
        }),
        {
            name: 'petpet-product-variations'
        }
    )
);