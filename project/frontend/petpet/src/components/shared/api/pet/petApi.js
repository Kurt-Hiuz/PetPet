import petsData from '../../../../data/pets_test_data.json';
import { apiRequest, buildQueryString } from '../httpClient';

/**
 * Получить список питомцев пользователя
 * @param {Object} [options]
 * @param {string} [options.ownerId] - ID владельца для фильтрации
 * @returns {Promise<Array<import('../../types/petTypes').Pet>>}
 */
export const getPets = async ({ ownerId } = {}) => {
    const queryString = buildQueryString({ ownerId });
    
    return apiRequest(`/pets${queryString}`, {
        serviceName: 'pet',
        mockHandler: () => {
            let filtered = petsData;
            
            // Фильтрация по ownerId (если указан)
            if (ownerId) {
                filtered = petsData.filter(p => p.ownerId === ownerId);
            }
            
            // Возвращаем пустой массив — это нормально для списка
            // (в отличие от ленты постов, где NO_MORE_DATA означает конец)
            return filtered;
        },
        fetchOptions: {
            method: 'GET',
        },
    });
};

/**
 * Получить питомца по ID
 * @param {string} petId - ID питомца
 * @returns {Promise<import('../../types/petTypes').Pet>}
 * @throws {Error} Если питомец не найден
 */
export const getPetById = async (petId) => {
    return apiRequest(`/pets/${petId}`, {
        serviceName: 'pet',
        mockHandler: () => {
            const pet = petsData.find(p => p.id === petId);
            if (!pet) {
                throw new Error('PET_NOT_FOUND');
            }
            return pet;
        },
        fetchOptions: {
            method: 'GET',
        },
    });
};

// TODO: В будущем здесь появятся:
// export const createPet = async (formData) => { ... }
// export const updatePet = async (petId, formData) => { ... }
// export const deletePet = async (petId) => { ... }