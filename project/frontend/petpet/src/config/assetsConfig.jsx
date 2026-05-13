const BASE_PATH = import.meta.env.BASE_URL || '/';

export const IMAGES = {
    NO_IMG: `${BASE_PATH}images/no-img.png`
    // NO_AVATAR: `${BASE_PATH}images/no-avatar.png`,
    // LOGO: `${BASE_PATH}images/logo.svg`,
    // EMPTY_STATE: `${BASE_PATH}images/empty-state.svg`,
    // PET_PLACEHOLDER: `${BASE_PATH}images/pet-placeholder.png`,
};

export const DETAILS = {
    NO_DESCRIPTION: 'Пустое описание'
}

// export const ICONS = {
    // PAW: `${BASE_PATH}icons/paw.svg`,
    // HEART: `${BASE_PATH}icons/heart.svg`,
    // FILTER: `${BASE_PATH}icons/filter.svg`,
// };

// 🔧 Динамический путь (например, для аватарок пользователей)
// export const getUserAvatarUrl = (userId) => `${BASE_PATH}images/avatars/${userId}.jpg`;

// export const getPetImage = (petId) => `${BASE_PATH}images/pets/${petId}.webp`;