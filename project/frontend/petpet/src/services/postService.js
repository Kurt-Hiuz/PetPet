import postData from '../data/post_test_data.json';

/**
 * Получает ленту постов
 * @param {Object} options
 * @param {number} options.limit - сколько постов вернуть
 * @param {number} options.offset - с какого индекса начать
 * @returns {Promise<Array>} массив постов
 */
export const getFeed = async ({ limit = 10, offset = 0 } = {}) => {
  // Имитация задержки сети (убрать при переходе на реальный API)
    await new Promise(res => setTimeout(res, 600));

    // Эмуляция пагинации
    const paginatedData = postData.slice(offset, offset + limit);

    if (paginatedData.length === 0) {
        throw new Error("NO_MORE_DATA");
    }

    return paginatedData;
};

// В будущем здесь появятся:
// export const getPostById = async (id) => { ... }
// export const createPost = async (formData) => { ... }
// export const reactToPost = async (postId, type) => { ... }