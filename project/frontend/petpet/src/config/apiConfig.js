/**
 * Конфигурация API
 * USE_MOCK — глобальный переключатель (все сервисы на mock)
 * OVERRIDES — точечное переключение для конкретных сервисов
 * 
 * ! ВНИМАНИЕ: при использовании OVERRIDES данные из mock и real API
 * ! могут быть несовместимы по ID. Используйте только для временной миграции.
 */
export const API_CONFIG = {
    USE_MOCK: true,
    MOCK_DELAY: 600, // мс, как было в postService.js
    BASE_URL: 'http://localhost:8080/api',
    
    // Точечные переопределения (раскомментировать при необходимости)
    OVERRIDES: {
      // post: false,  // postApi → всегда real
      // pet: true,    // petApi → всегда mock
    },
};