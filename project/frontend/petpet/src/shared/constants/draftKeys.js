/**
 * Префиксы ключей для хранения черновиков в localStorage.
 */
export const DRAFT_KEYS = {
    USER_POST: 'draft:post:user',
    PET_POST_PREFIX: 'draft:post:pet:',
};

export const getPetDraftKey = (petId) => `${DRAFT_KEYS.PET_POST_PREFIX}${petId}`;

/**
 * Имя кастомного события для уведомления об изменении черновика
 * в текущей вкладке (storage event срабатывает только между вкладками).
 */
export const DRAFT_UPDATED_EVENT = 'draft-updated';