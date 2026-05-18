export function pluralizeComments(count) {
    const n = Math.abs(count);
    if (n % 10 === 1 && n % 100 !== 11) return `${n} комментарий`;
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return `${n} комментария`;
    return `${n} комментариев`;
}