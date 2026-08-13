import classes from './styles/CartItemMini.module.css';

import QuantitySelector from '@ui/QuantitySelector/QuantitySelector';
import Icon from '@ui/Icon/Icon';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { IMAGES } from '@config/assetsConfig';

import { formatNumber } from '@utils/formatNumber';

export default function CartItemMini({ item, productUrl, onQuantityChange, onRemove }) {
    const {
        title,
        price,
        quantity,
        image,
        variationLabel,
    } = item;
    
    return (
        <article className={classes.item}>
            <Link to={productUrl} className={classes.image_link}>
                <img 
                    src={image || IMAGES.NO_IMG} 
                    alt={title}
                    className={classes.image}
                    loading="lazy"
                />
            </Link>
            
            <div className={classes.info}>
                <Link to={productUrl} className={classes.title_link}>
                    <h4 className={classes.title}>{title}</h4>
                </Link>
                
                {variationLabel && (
                    <span className={classes.variation}>{variationLabel}</span>
                )}
                
                <div className={classes.bottom_row}>
                    <QuantitySelector
                        value={quantity}
                        onChange={onQuantityChange}
                        onRemove={onRemove}
                        allowZero={true}
                        size="small"
                    />
                    <span className={classes.price}>
                        {formatNumber(price * quantity)} ₽
                    </span>
                </div>
            </div>
            
            <button
                type="button"
                className={classes.remove_btn}
                onClick={onRemove}
                aria-label="Удалить из корзины"
            >
                <Icon icon={faTimes} size="sm" />
            </button>
        </article>
    );
}