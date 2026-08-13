import classes from './styles/ProductCardDescription.module.css';

import Icon from '@ui/Icon/Icon';

import { faStar } from '@fortawesome/free-solid-svg-icons';

import { formatCount } from '@utils/formatCount';
import { pluralizeReviews } from '@utils/pluralize';
import { formatNumber } from '@utils/formatNumber';

/**
 * Описание товара: цена, название, рейтинг, количество отзывов.
 * @param {Object} props
 * @param {Object} props.data - Нормализованные данные описания
 * @param {number} props.data.price
 * @param {string} props.data.title
 * @param {number} props.data.stars
 * @param {number} props.data.reviewCount
 */
export default function ProductCardDescription({data}){
    if (!data) return null;
    
    return(
        <div className={classes.description}>
            <p className={classes.price}>{formatNumber(data.price)} руб.</p>
            <h3 className={classes.goods_description}>{data.title}</h3>
            <p className={classes.feedback}>
                <Icon icon={faStar} color='#ffd20a'/> <span>{data.stars}</span> ({formatCount(data.reviewCount)} {pluralizeReviews(data.reviewCount)})
            </p>
        </div>
    );
}