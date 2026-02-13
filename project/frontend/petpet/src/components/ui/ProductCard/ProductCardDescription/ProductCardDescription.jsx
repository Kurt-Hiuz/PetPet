import classes from './styles/ProductCardDescription.module.css';

import Icon from '../../Icon/Icon';

import { faStar } from '@fortawesome/free-solid-svg-icons';

function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'; // 16724 → "16.7k"
    }
    return num;
}

export default function ProductCardDescription({data}){
    return(
        <div className={classes.description}>
            <p className={classes.price}>{data.price} руб.</p>
            <h3 className={classes.goods_description}>{data.title}</h3>
            <p className={classes.feedback}>
                <Icon icon={faStar} color='#ffd20a'/> <span>{data.stars}</span> ({formatNumber(data.reviewCount)} отзывов)
            </p>
        </div>
    );
}