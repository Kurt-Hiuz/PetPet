import classes from './styles/CartItem.module.css';

import QuantitySelector from '@ui/QuantitySelector/QuantitySelector';
import Icon from '@ui/Icon/Icon';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { IMAGES } from '@config/assetsConfig';

import { formatNumber } from '@utils/formatNumber';

export default function CartItem({ item, productUrl, onQuantityChange, onRemove }) {
    const {
        title,
        price,
        quantity,
        image,
        variationLabel,
    } = item;
    
    const totalPrice = price * quantity;
    
    return (
        <article className={classes.cart_item}>
            <Link 
                to={productUrl}
                className={classes.image_link}
                aria-label={`Перейти к товару ${title}`}
            >
                <img 
                    src={image || IMAGES.NO_IMG} 
                    alt={title}
                    className={classes.image}
                    loading="lazy"
                    decoding="async"
                />
            </Link>
            
            <div className={classes.info}>
                <Link 
                    to={productUrl}
                    className={classes.title_link}
                >
                    <h3 className={classes.title}>{title}</h3>
                </Link>
                
                {variationLabel && (
                    <span className={classes.variation}>
                        Вариант: <strong>{variationLabel}</strong>
                    </span>
                )}
                
                <div className={classes.price_per_unit}>
                    {formatNumber(price)} ₽ за шт.
                </div>
                
                <div className={classes.controls}>
                    <QuantitySelector
                        value={quantity}
                        onChange={onQuantityChange}
                        onRemove={onRemove}
                        allowZero={true}
                        size="medium"
                    />
                    
                    <div className={classes.total_price}>
                        {formatNumber(totalPrice)} ₽
                    </div>
                </div>
            </div>
            
            <button
                type="button"
                className={classes.remove_btn}
                onClick={onRemove}
                aria-label={`Удалить ${title} из корзины`}
            >
                <Icon icon={faTimes} size="lg" />
            </button>
        </article>
    );
}