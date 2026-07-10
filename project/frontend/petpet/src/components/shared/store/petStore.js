import { create } from 'zustand';

/** 
 * TODO: сделать
 * @typedef {import('../types/petTypes').Pet} Pet
 */

/**
 * Состояние стора питомцев
 * @typedef {Object} PetStoreState
 * @property {string|null} activePetId - ID текущего выбранного питомца
 * @property {Pet[]} pets - Список всех питомцев пользователя
 * @property {boolean} isLoading - Флаг загрузки списка питомцев
 * @property {string|null} error - Сообщение об ошибке
 */

/**
 * Действия стора
 * @typedef {Object} PetStoreActions
 * @property {(id: string | null) => void} setActivePetId - Установить активного питомца
 * @property {(pets: Pet[]) => void} setPets - Установить список питомцев
 * @property {(isLoading: boolean) => void} setLoading - Установить флаг загрузки
 * @property {(error: string | null) => void} setError - Установить ошибку
 * @property {() => Pet | null} getCurrentPet - Получить объект текущего питомца
 */

/**
 * Zustand стор для управления контекстом питомца
 * 
 * Почему я выбрал использовать Zustand, а не Context API:
 * 1. Селекторы, из-за которых нет лишних ре-рендеров
 * 2. Можно использовать вне React-компонентов
 * 3. Нет необходимости в Provider-обёртке
 * 4. Легко интегрируется с React Query
 */

/** @type {import('zustand').StateCreator<PetStoreState & PetStoreActions>} */
export const usePetStore = create((set, get) => ({
  // ========== STATE ==========
    activePetId: null,
    pets: [],
    isLoading: false,
    error: null,
    
  // ========== ACTIONS ==========
    
    /**
     * Установить активного питомца по ID
     * Вызывается при:
     * - Клик в PetSwitcher
     * - Синхронизация с URL
     * - Восстановление из localStorage
     */
    setActivePetId: (id) => set({ activePetId: id }),

    /**
    * Установить список питомцев (после загрузки с API)
    */
    setPets: (pets) => set({ pets }),
    
    /**
    * Установить флаг загрузки
    */
    setLoading: (isLoading) => set({ isLoading }),
    
    /**
     * Установить сообщение об ошибке
     */
    setError: (error) => set({ error }),
    
    /**
     * Получить объект текущего питомца
     * Использует get() для доступа к текущему состоянию
     */
    getCurrentPet: () => {
        const { activePetId, pets } = get();
        return pets.find(p => p.id === activePetId) || null;
    },
}));

// ========== СЕЛЕКТОРЫ для производительности ==========
// Каждый селектор подписан только на своё поле, отсюда минимум ре-рендеров

/**
 * Получить только ID активного питомца
 * Ре-рендерит компонент ТОЛЬКО при смене petId
 */
export const useActivePetId = () => usePetStore((state) => state.activePetId);

/**
 * Получить только список питомцев
 * Ре-рендерит ТОЛЬКО при изменении массива pets
 */
export const usePetsList = () => usePetStore((state) => state.pets);

/**
 * Получить объект текущего питомца
 * Использует shallow-сравнение, чтобы не ре-рендерить при других изменениях
 */
export const useCurrentPet = () => usePetStore((state) => 
    state.pets.find(p => p.id === state.activePetId) || null
);

/**
 * Получить флаг загрузки
 */
export const usePetLoading = () => usePetStore((state) => state.isLoading);

/**
 * Получить ошибку
 */
export const usePetError = () => usePetStore((state) => state.error);