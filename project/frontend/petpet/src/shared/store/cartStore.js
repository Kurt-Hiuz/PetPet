import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * @typedef {Object} CartItem
 * @property {string} productId - ID товара
 * @property {string} variationId - ID вариации
 * @property {number} quantity - Количество
 * @property {string} title - Название товара
 * @property {number} price - Цена за единицу
 * @property {string} [image] - URL изображения
 * @property {string} [variationLabel] - Название вариации (например, "3 кг")
 * @property {string} addedAt - Дата добавления (ISO)
 */

/**
 * Уникальный ключ элемента корзины = productId + variationId.
 * Это позволяет иметь в корзине один и тот же товар в разных вариациях.
 * Например: свитер размера S и свитер размера M - это ДВА разных элемента.
 */
const getCartKey = (productId, variationId) => `${productId}__${variationId}`;

export const useCartStore = create(
    persist(
        (set, get) => ({
            /** @type {Object<string, CartItem>} */
            items: {},
            
            /**
             * Добавить товар в корзину или увеличить количество
             * @param {Object} item - { productId, variationId, title, price, ... }
             */
            addItem: (item) => {
                const key = getCartKey(item.productId, item.variationId);
                const existing = get().items[key];
                
                if (existing) {
                    // Уже есть - увеличиваем количество
                    set(state => ({
                        items: {
                            ...state.items,
                            [key]: { ...existing, quantity: existing.quantity + 1 }
                        }
                    }));
                } else {
                    // Добавляем новый элемент
                    set(state => ({
                        items: {
                            ...state.items,
                            [key]: {
                                ...item,
                                quantity: 1,
                                addedAt: new Date().toISOString(),
                            }
                        }
                    }));
                }
            },
            
            /**
             * Удалить товар из корзины
             * @param {string} productId
             * @param {string} variationId
             */
            removeItem: (productId, variationId) => {
                const key = getCartKey(productId, variationId);
                set(state => {
                    const { [key]: _, ...rest } = state.items;
                    return { items: rest };
                });
            },
            
            /**
             * Изменить количество товара
             * @param {string} productId
             * @param {string} variationId
             * @param {number} quantity
             */
            updateQuantity: (productId, variationId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId, variationId);
                    return;
                }
                
                const key = getCartKey(productId, variationId);
                set(state => ({
                    items: {
                        ...state.items,
                        [key]: { ...state.items[key], quantity }
                    }
                }));
            },
            
            /**
             * Получить количество конкретного товара с конкретной вариацией
             * @param {string} productId
             * @param {string} variationId
             * @returns {number}
             */
            getItemCount: (productId, variationId) => {
                const key = getCartKey(productId, variationId);
                return get().items[key]?.quantity || 0;
            },
            
            /**
             * Получить общее количество товаров в корзине (для бейджа)
             * @returns {number}
             */
            getTotalCount: () => {
                return Object.values(get().items).reduce(
                    (sum, item) => sum + item.quantity, 
                    0
                );
            },
            
            /**
             * Получить общую сумму корзины
             * @returns {number}
             */
            getTotalPrice: () => {
                return Object.values(get().items).reduce(
                    (sum, item) => sum + item.price * item.quantity, 
                    0
                );
            },
            
            /**
             * Получить все элементы корзины как массив (для страницы корзины)
             * @returns {CartItem[]}
             */
            getItemsList: () => {
                return Object.values(get().items);
            },
            
            /**
             * Очистить корзину
             */
            clearCart: () => set({ items: {} }),
        }),
        {
            name: 'petpet-cart',
        }
    )
);