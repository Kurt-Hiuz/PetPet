import classes from './styles/ProductCard.module.css';

import { memo } from 'react';

import ProductCardImage from '@ui/ProductCardGrid/ProductCardGrid';
import ProductCardDescription from '@ui/ProductCardDescription/ProductCardDescription';

import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

function ProductCard({data}){
    return(
        <article className={classes.product_card}>
            <ProductCardImage imagePath={data.productImgPath} />
            <ProductCardDescription data={data.productDescription} />
            <Button variant='secondary' fullWidth={true}>
                Заказать <Icon icon={faCartShopping}/>
            </Button>
        </article>
    );
}

export default memo(ProductCard);