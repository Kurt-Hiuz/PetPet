/**
 * Форматирует число для бейджа (счётчика).
 * Если число > 99, возвращает "99+".
 * 
 * @param {number} count
 * @param {number} [max=99] - Максимальное отображаемое значение
 * @returns {string}
 * 
 * @example
 * formatBadgeCount(5)    // "5"
 * formatBadgeCount(99)   // "99"
 * formatBadgeCount(100)  // "99+"
 * formatBadgeCount(500)  // "99+"
 */
export function formatBadgeCount(count, max = 99) {
    if (count == null || count <= 0) return '';
    if (count > max) return `${max}+`;
    return count.toString();
}