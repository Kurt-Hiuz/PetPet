import classes from './styles/ProductCardDescription.module.css';

import Icon from '@ui/Icon/Icon';

import { faStar } from '@fortawesome/free-solid-svg-icons';

import { formatCount } from '@utils/formatCount';

export default function ProductCardDescription({data}){
    return(
        <div className={classes.description}>
            <p className={classes.price}>{data.price} руб.</p>
            <h3 className={classes.goods_description}>{data.title}</h3>
            <p className={classes.feedback}>
                <Icon icon={faStar} color='#ffd20a'/> <span>{data.stars}</span> ({formatCount(data.reviewCount)} отзывов)
            </p>
        </div>
    );
}