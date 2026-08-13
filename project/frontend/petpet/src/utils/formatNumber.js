/**
 * Форматирует число с разделителем тысяч (апостроф).
 * 
 * Примеры:
 *   1000 -> "1'000"
 *   1000000 -> "1'000'000"
 *   1500.5 -> "1'500.5"
 *   0 -> "0"
 *   null/undefined/NaN -> "0"
 * 
 * @param {number|string} num - Число для форматирования
 * @returns {string} - Отформатированное число
 * 
 * @example
 * formatNumber(1000)       // "1'000"
 * formatNumber(1000000)    // "1'000'000"
 * formatNumber(1500.5)     // "1'500.5"
 * formatNumber("2500")     // "2'500"
 */
export function formatNumber(num) {
    // Защита от невалидных значений
    if (num == null || num === '') return '0';
    
    const n = Number(num);
    if (isNaN(n)) return '0';
    
    // Разделяем целую и дробную части
    const [intPart, decPart] = n.toString().split('.');
    
    // Добавляем апостроф как разделитель тысяч
    // Регулярка: ищем позиции, после которых идёт кратное 3 количество цифр
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    
    // Возвращаем с дробной частью, если она есть
    return decPart ? `${formatted}.${decPart}` : formatted;
}