import classes from './styles/ProductCard.module.css';

import { memo } from 'react';
import { Link } from 'react-router-dom';

import ProductCardImage from '@ui/ProductCard/ProductCardImage/ProductCardImage';
import ProductCardDescription from '@ui/ProductCard/ProductCardDescription/ProductCardDescription';

import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { normalizeProduct } from '@utils/normalize';

function ProductCard({data}){
    const product = normalizeProduct(data);
    if (!product) return null;

    return(
        <Link to={`/product/${product.id}`} className={classes.product_card_link}>
            <article className={classes.product_card}>
                <ProductCardImage 
                    imagePath={product.productImgPath} 
                    productId={product.id}
                    productData={product}
                />

                <ProductCardDescription data={product.productDescription} />

                <Button 
                    variant='secondary' 
                    fullWidth={true}
                    ariaLabel={`Добавить ${data.productDescription.title} в корзину`}
                    OnClick={(e) => e.preventDefault()}
                >
                    Заказать <Icon icon={faCartShopping}/>
                </Button>
            </article>
        </Link>
    );
}

export default memo(ProductCard);