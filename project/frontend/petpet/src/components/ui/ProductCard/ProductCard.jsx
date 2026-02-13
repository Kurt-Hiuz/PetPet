import classes from './styles/ProductCard.module.css';

import ProductCardImage from './ProductCardImage/ProductCardImage';
import ProductCardDescription from './ProductCardDescription/ProductCardDescription';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function ProductCard({data = {}}){
    const product = {
        // TODO: сделать "/images/no-img.png"
        "productImgPath": data.productImgPath ?? "/images/no-img.png",
        "productDescription" : {
            "price": data.productDescription?.price ?? -1,
            "title": data.productDescription?.title ?? "Пустое описание",
            "stars": data.productDescription?.stars ?? -1,
            "reviewCount": data.productDescription?.reviewCount ?? -1
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