/**
 * Склонение слов в русском языке
 * @param {number} count - Число
 * @param {[string, string, string]} words - Три формы слова: [1, 2, 5]
 * @returns {string} - правильная форма слова без самого числа
 * 
 * @example
 * pluralize(1, ['комментарий', 'комментария', 'комментариев']) // "комментарий"
 * pluralize(2, ['комментарий', 'комментария', 'комментариев']) // "комментария"
 * pluralize(5, ['комментарий', 'комментария', 'комментариев']) // "комментариев"
 */
export function pluralize(count, words) {
    const n = Math.abs(count);
    const mod10 = n % 10;
    const mod100 = n % 100;
    
    if (mod10 === 1 && mod100 !== 11) {
        return words[0]; // 1, 21, 31...
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
        return words[1]; // 2, 3, 4, 22, 23...
    }
    return words[2]; // 0, 5-20, 25-30...
}

// Удобные обёртки для частых случаев
export const pluralizeComments = (count) => pluralize(count, ['комментарий', 'комментария', 'комментариев']);
export const pluralizeReviews = (count) => pluralize(count, ['отзыв', 'отзыва', 'отзывов']);
export const pluralizeProducts = (count) => pluralize(count, ['товар', 'товара', 'товаров']);