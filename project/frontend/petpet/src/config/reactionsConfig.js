// import { faThumbsUp, faHeart, faFire } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

/**
 * Чтобы добавить новую реакцию:
 * 1. Импортируй иконку
 * 2. Добавь объект в массив, обозначив key (обязательно), саму иконку icon 
 *      и отображаемую надпись при наведении label
 * 3. Готово. UI обновится автоматически.
 */
export const REACTIONS_CONFIG = [
    // { key: 'likes', icon: faThumbsUp, label: 'Нравится' },
    { key: 'hearts', icon: faHeart, label: 'Люблю' },
    // { key: 'fire', icon: faFire, label: 'Огонь' },
];