import classes from './styles/ProductInfo.module.css';
import clsx from 'clsx';

import Icon from '@ui/Icon/Icon';
import Button from '@ui/Button/Button';

import { faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { pluralizeReviews } from '@utils/pluralize';

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {number} props.price - Цена в рублях. -1 или undefined = не указана
 * @param {number} props.rating - Рейтинг 0-5. -1 или undefined = нет рейтинга
 * @param {number} props.reviewCount - Количество отзывов. -1 или undefined = нет отзывов
 * @param {string} props.shortDescription
 * @param {boolean} props.inStock
 */
export default function ProductInfo({ 
    title, 
    price, 
    rating, 
    reviewCount, 
    shortDescription,
    inStock 
}) {
    // Проверяем, что данные валидны (не -1, не undefined, не null)
    const hasPrice = price != null && price >= 0;
    const hasRating = rating != null && rating >= 0;
    const hasReviews = reviewCount != null && reviewCount >= 0;
    
    return (
        <div className={classes.info}>
            <h1 className={classes.title}>{title}</h1>
            
            {/* Показываем рейтинг только если он есть */}
            {hasRating && (
                <div className={classes.rating_row}>
                    <Icon icon={faStar} color="#ffd20a" size="lg" />
                    <span className={classes.rating}>{rating}</span>
                    {hasReviews && (
                        <span className={classes.review_count}>
                            {pluralizeReviews(reviewCount)}
                        </span>
                    )}
                </div>
            )}
            
            {shortDescription && (
                <p className={classes.description}>{shortDescription}</p>
            )}
            
            <div className={classes.price_row}>
                {/* Показываем цену или "Не указана" */}
                <span className={classes.price}>
                    {hasPrice ? `${price} ₽` : 'Цена не указана'}
                </span>
                <span className={clsx(
                    classes.stock_status,
                    inStock ? classes.stock_status_in_stock : classes.stock_status_out_of_stock
                )}>
                    {inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
            </div>
            
            <Button 
                variant="primary" 
                fullWidth
                disabled={!inStock || !hasPrice}
                ariaLabel={hasPrice ? `Добавить ${title} в корзину` : 'Товар недоступен'}
            >
                В корзину <Icon icon={faCartShopping} />
            </Button>
        </div>
    );
}