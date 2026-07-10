import postData from '../../../../data/post_test_data.json';
import { apiRequest, buildQueryString } from '../httpClient';

/**
 * Получить ленту постов
 * @param {Object} options
 * @param {number} [options.limit=10] - количество постов
 * @param {number} [options.offset=0] - сдвиг для пагинации
 * @param {string} [options.petId] - фильтр по ID питомца
 * @returns {Promise<Array<Post>>}
 */
export const getFeed = async ({ limit = 10, offset = 0, petId } = {}) => {
    const queryString = buildQueryString({ limit, offset, petId });
    
    return apiRequest(`/posts/feed${queryString}`, {
        serviceName: 'post',
        mockHandler: () => {
            // Фильтрация по petId (если указан)
            let filtered = postData;
            if (petId) {
                filtered = postData.filter(post => post.author?.petId === petId);
            }

            // Пагинация
            const paginatedData = filtered.slice(offset, offset + limit);
            if (paginatedData.length === 0) {
                throw new Error('NO_MORE_DATA');
            }
            return paginatedData;
        },
        fetchOptions: {
            method: 'GET',
        },
    });
};

// TODO: В будущем здесь появятся:
// export const getPostById = async (id) => { ... }
// export const createPost = async (formData) => { ... }
// export const reactToPost = async (postId, type) => { ... }