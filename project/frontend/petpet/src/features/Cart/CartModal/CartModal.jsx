import { useMemo } from 'react';

import { Link } from 'react-router-dom';

import classes from './styles/CartModal.module.css';

import CartItemMini from '@ui/CartItemMini/CartItemMini';
import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { pluralizeProducts } from '@utils/pluralize';
import { formatNumber } from '@utils/formatNumber';

import { useCartStore } from '@shared/store/cartStore';

/**
 * Содержимое модалки корзины.
 * НЕ управляет закрытием модалки - это делает CartButton через location.key.
 */
export default function CartModal() {
    const cartItems = useCartStore(state => state.items);
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeItem);
    
    const items = useMemo(() => Object.values(cartItems), [cartItems]);
    
    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );
    
    const totalPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );
    
    const getProductUrl = (productId, variationId) => {
        return variationId 
            ? `/product/${productId}?variation=${variationId}`
            : `/product/${productId}`;
    };
    
    if (items.length === 0) {
        return (
            <div className={classes.empty}>
                <p>Корзина пуста</p>
                <p className={classes.hint}>Добавьте товары из магазина</p>
            </div>
        );
    }
    
    return (
        <div className={classes.modal_content}>
            <div className={classes.items_list}>
                {items.map(item => (
                    <CartItemMini
                        key={`${item.productId}__${item.variationId}`}
                        item={item}
                        productUrl={getProductUrl(item.productId, item.variationId)}
                        onQuantityChange={(newQty) => 
                            updateQuantity(item.productId, item.variationId, newQty)
                        }
                        onRemove={() => 
                            removeItem(item.productId, item.variationId)
                        }
                    />
                ))}
            </div>
            
            <div className={classes.footer}>
                <div className={classes.total}>
                    <span className={classes.total_label}>
                        Итого за {totalCount} {pluralizeProducts(totalCount)}:
                    </span>
                    <span className={classes.total_price}>
                        {formatNumber(totalPrice)} ₽
                    </span>
                </div>
                <Link to="/cart" className={classes.full_link}>
                    <Button variant="primary" fullWidth>
                        Перейти в корзину <Icon icon={faArrowRight} />
                    </Button>
                </Link>
            </div>
        </div>
    );
}