import { API_CONFIG } from '../../config/apiConfig';

/**
 * Определяет, использовать ли mock для конкретного сервиса
 * @param {string} serviceName - Имя сервиса (например, 'post', 'pet')
 * @returns {boolean}
 */
const shouldUseMock = (serviceName) => {
    const override = API_CONFIG.OVERRIDES?.[serviceName];
    return override !== undefined ? override : API_CONFIG.USE_MOCK;
};

/**
 * Проверяет рассогласованность режимов и выводит предупреждение
 * @param {string} serviceName
 * @param {boolean} isMock
 */
const checkConsistency = (serviceName, isMock) => {
    if (isMock !== API_CONFIG.USE_MOCK) {
        console.warn(
            `[API] Сервис "${serviceName}" использует данные из ${isMock ? 'MOCK' : 'REAL'}, ` +
            `но глобальный мод использования данных стоит на ${API_CONFIG.USE_MOCK ? 'MOCK' : 'REAL'}. ` +
            `ID-шники могут быть несовместимы!`
        );
    }
};

/**
 * Универсальный клиент для API-запросов
 * Автоматически выбирает mock или real на основе API_CONFIG
 * 
 * @param {string} endpoint - Путь к эндпоинту (например, '/posts/feed')
 * @param {Object} options - Настройки запроса
 * @param {string} options.serviceName - Имя сервиса для логирования и overrides
 * @param {Function} options.mockHandler - Функция, возвращающая mock-данные
 * @param {Object} options.fetchOptions - Настройки для fetch (method, body, headers...)
 * @returns {Promise<any>}
 * 
 * @example
 * const pets = await apiRequest('/pets', {
 *   serviceName: 'pet',
 *   mockHandler: () => petsData,
 *   fetchOptions: { method: 'GET' }
 * });
 */
export const apiRequest = async (endpoint, { serviceName, mockHandler, fetchOptions = {} } = {}) => {
    // Валидация параметров
    if (!serviceName) {
        throw new Error('[API] serviceName необходим для apiRequest');
    }

    if (!mockHandler || typeof mockHandler !== 'function') {
        throw new Error('[API] mockHandler должен быть функцией');
    }

    const isMock = shouldUseMock(serviceName);

    // Проверка рассогласованности
    checkConsistency(serviceName, isMock);

    // ========== РЕЖИМ MOCK ==========
    if (isMock) {
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DELAY));
        return mockHandler();
    }

    // ========== РЕЖИМ REAL API ==========
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                // TODO: Добавить Authorization header, когда будет авторизация
                // 'Authorization': `Bearer ${getToken()}`,
            },
            ...fetchOptions,
        });

        // Обработка HTTP-ошибок
        if (!response.ok) {
            const error = new Error(`API_ERROR_${response.status}`);
            error.status = response.status;
            error.statusText = response.statusText;

            // Попытка прочитать тело ошибки
            try {
                error.body = await response.json();
            } catch {
                error.body = null;
            }

            throw error;
        }
        
        // Успешный ответ
        return await response.json();

    } catch (error) {
        // Обработка сетевых ошибок
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('NETWORK_ERROR: Не удалось подключиться к серверу');
        }

        // Пробрасываем остальные ошибки
        throw error;
    }
};

/**
 * Утилита для построения query-строки
 * @param {Object} params - Параметры запроса
 * @returns {string} Query-строка (например, '?limit=10&offset=0')
 * 
 * @example
 * const query = buildQueryString({ limit: 10, offset: 0, petId: 'pet_1' });
 * // '?limit=10&offset=0&petId=pet_1'
 */
export const buildQueryString = (params) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
};