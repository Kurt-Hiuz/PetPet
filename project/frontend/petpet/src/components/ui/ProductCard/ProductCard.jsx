import classes from './styles/ProductCard.module.css';

import { IMAGES, DETAILS } from '../../../config/assetsConfig';

import ProductCardImage from './ProductCardImage/ProductCardImage';
import ProductCardDescription from './ProductCardDescription/ProductCardDescription';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function ProductCard({data = {}}){
    const product = {
        "productImgPath": data.productImgPath ?? IMAGES.NO_IMG,
        "productDescription" : {
            "price": data.productDescription?.price ?? DETAILS.NO_PRICE,
            "title": data.productDescription?.title ?? DETAILS.NO_DESCRIPTION,
            "stars": data.productDescription?.stars ?? DETAILS.NO_STARS,
            "reviewCount": data.productDescription?.reviewCount ?? DETAILS.NO_REVIEW
        }
    }
    
    return(
        <article className={classes.product_card}>
            <ProductCardImage imagePath={product.productImgPath} />
            <ProductCardDescription data={product.productDescription} />
            <Button variant='secondary' fullWidth={true}>
                Заказать <Icon icon={faCartShopping}/>
            </Button>
        </article>
    );
}