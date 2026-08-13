import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import classes from './styles/Cart.module.css';

import { useCartStore } from '@shared/store/cartStore';

import CartItem from '@ui/CartItem/CartItem';
import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { pluralizeProducts } from '@utils/pluralize';
import { formatNumber } from '@utils/formatNumber';

export default function Cart() {
    const cartItems = useCartStore(state => state.items);
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeItem);
    const clearCart = useCartStore(state => state.clearCart);
    
    const items = useMemo(() => Object.values(cartItems), [cartItems]);
    const totalCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );
    const totalPrice = useMemo(
        () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [items]
    );
    
    if (items.length === 0) {
        return (
            <div className={classes.empty_state}>
                <h2>Корзина пуста</h2>
                <p>Добавьте товары из магазина</p>
                <Link to="/store">
                    <Button variant="primary">Перейти в магазин</Button>
                </Link>
            </div>
        );
    }

    const getProductUrl = (productId, variationId) => {
        return variationId 
            ? `/product/${productId}?variation=${variationId}`
            : `/product/${productId}`;
    };
    
    return (
        <div className={classes.cart_page}>
            <header className={classes.header}>
                <h1>Корзина</h1>
                <span className={classes.count}>
                    {totalCount} {pluralizeProducts(totalCount)}
                </span>
                <Button
                    variant="ghost"
                    classList={classes.clear_btn}
                    OnClick={clearCart}
                    ariaLabel="Очистить корзину"
                >
                    <Icon icon={faTrash} /> Очистить
                </Button>
            </header>
            
            <div className={classes.content}>
                <div className={classes.items_list}>
                    {items.map(item => (
                        <CartItem
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
                
                <aside className={classes.summary}>
                    <div className={classes.summary_row}>
                        <span>Товары ({totalCount})</span>
                        <span>{formatNumber(totalPrice)} ₽</span>
                    </div>
                    <div className={classes.summary_row}>
                        <span>Доставка</span>
                        <span>Бесплатно</span>
                    </div>
                    <div className={`${classes.summary_row} ${classes.total_row}`}>
                        <span>Итого</span>
                        <span className={classes.total_price}>{formatNumber(totalPrice)} ₽</span>
                    </div>
                    <Button variant="primary" fullWidth>
                        Оформить заказ
                    </Button>
                </aside>
            </div>
        </div>
    );
}