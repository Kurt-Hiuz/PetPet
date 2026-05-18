export function formatCount(count) {
    if (count == null || count < 0) return '0';
    if (count < 1000) return count.toString();
    
    const formatted = (count / 1000).toFixed(1); // "8.2", "15.0", "1.0"
    const clean = formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted;
    return `${clean}к`;
}