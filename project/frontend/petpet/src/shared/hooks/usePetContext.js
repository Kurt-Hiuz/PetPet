import {
    usePetStore,
    useActivePetId,
    useCurrentPet,
    usePetsList,
    usePetLoading,
    usePetError,
} from '../store/petStore';

/**
 * Публичный API для работы с контекстом питомца
 * 
 * Этот хук - ЕДИНСТВЕННЫЙ способ получить данные о текущем питомце
 * из любого компонента приложения.
 * 
 * Почему не использовать usePetStore напрямую:
 * 1. Инкапсуляция: если решим сменить Zustand на Context API -
 *    нужно поменять ТОЛЬКО этот хук, а не все компоненты
 * 2. Валидация: хук может дополнять данные (например, проверять
 *    существование питомца)
 * 3. Единая точка входа: все компоненты получают данные одинаково
 * 
 * @returns {{
 *   activePetId: string | null,
 *   currentPet: import('../types/petTypes').Pet | null,
 *   pets: import('../types/petTypes').Pet[],
 *   setPetId: (id: string) => void,
 *   isLoading: boolean,
 *   error: string | null,
 * }}
 */
export const usePetContext = () => {
    // Используем селекторы для производительности
    const activePetId = useActivePetId();
    const currentPet = useCurrentPet();
    const pets = usePetsList();
    const isLoading = usePetLoading();
    const error = usePetError();
    
    // Action для смены питомца
    const setPetId = usePetStore((state) => state.setActivePetId);
    
    return {
        activePetId,
        currentPet,
        pets,
        setPetId,
        isLoading,
        error,
    };
};