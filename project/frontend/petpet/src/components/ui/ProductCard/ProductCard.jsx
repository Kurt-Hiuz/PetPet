import classes from './styles/ProductCard.module.css';

import { memo } from 'react';
import { Link } from 'react-router-dom';

import ProductCardImage from '@ui/ProductCard/ProductCardImage/ProductCardImage';
import ProductCardDescription from '@ui/ProductCard/ProductCardDescription/ProductCardDescription';

import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';
import QuantitySelector from '@ui/QuantitySelector/QuantitySelector';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { normalizeProduct } from '@utils/normalize';
import { getDefaultVariationId } from '@utils/getDefaultVariationId';
import { useCartStore } from '@shared/store/cartStore';

function ProductCard({ data }){
    const product = normalizeProduct(data);
    
    const { 
        id: productId, 
        productDescription,
        productImgPath,
    } = product;
    
    const { title, price } = productDescription;
    
    const variationId = getDefaultVariationId(product);
    
    // Проверяем наличие в корзине
    const cartItems = useCartStore(state => state.items);
    const cartKey = `${productId}__${variationId}`;
    const cartQuantity = cartItems[cartKey]?.quantity || 0;
    const isInCart = cartQuantity > 0;
    
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeItem);

    if (!product?.id) return null;
    
    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!productId || price <= 0) return;
        
        useCartStore.getState().addItem({
            productId,
            variationId,
            title,
            price,
            image: productImgPath,
            variationLabel: product.variations.find(v => v.id === variationId)?.label,
        });
    };
    
    const handleQuantityChange = (newQuantity) => {
        updateQuantity(productId, variationId, newQuantity);
    };
    
    const handleRemove = () => {
        removeItem(productId, variationId);
    };
    
    return (
        <Link to={`/product/${productId}`} className={classes.product_card_link}>
            <article className={classes.product_card}>
                <ProductCardImage 
                    imagePath={productImgPath} 
                    productId={productId}
                    productData={product}
                />
                <ProductCardDescription data={productDescription} />
                
                <div className={classes.action_area}>
                    {isInCart ? (
                        <QuantitySelector
                            value={cartQuantity}
                            onChange={handleQuantityChange}
                            onRemove={handleRemove}
                            allowZero={true}
                            size="medium"
                            fullWidth={true}
                        />
                    ) : (
                        <Button 
                            variant='secondary' 
                            fullWidth={true}
                            ariaLabel={`Добавить ${title} в корзину`}
                            OnClick={handleAddToCart}
                        >
                            Заказать <Icon icon={faCartShopping}/>
                        </Button>
                    )}
                </div>
            </article>
        </Link>
    );
}

export default memo(ProductCard);