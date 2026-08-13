import { useCartStore } from '@shared/store/cartStore';
import { formatBadgeCount } from '@utils/formatBadgeCount';

import classes from './styles/CartBadge.module.css';

export default function CartBadge() {
    // Читаем СЫРОЙ объект items - он стабилен
    const cartItems = useCartStore(state => state.items);
    
    // Вычисляем totalCount через Object.values
    const totalCount = Object.values(cartItems).reduce(
        (sum, item) => sum + item.quantity, 
        0
    );
    
    const badgeText = formatBadgeCount(totalCount);
    
    if (!badgeText) return null;
    
    return (
        <span 
            className={classes.badge}
            aria-label={`В корзине ${totalCount} товаров`}
        >
            {badgeText}
        </span>
    );
}