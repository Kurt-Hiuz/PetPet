import { Link } from 'react-router-dom';

import classes from './styles/ProductInfo.module.css';
import clsx from 'clsx';

import Icon from '@ui/Icon/Icon';
import Button from '@ui/Button/Button';
import QuantitySelector from '@ui/QuantitySelector/QuantitySelector';

import { faStar, faCartShopping, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { pluralizeReviews } from '@utils/pluralize';
import { getDefaultVariationId } from '@utils/getDefaultVariationId';
import { formatNumber } from '@utils/formatNumber';

import { useCartStore } from '@shared/store/cartStore';
import { useProductVariationsStore } from '@shared/store/productVariationsStore';

export default function ProductInfo({ product }) {    
    const {
        id: productId,
        productDescription: { title, price: basePrice, stars: rating, reviewCount },
        shortDescription,
        inStock,
        images,
        variations,
    } = product;
    
    const image = images?.[0];
    
    const hasPrice = basePrice != null && basePrice >= 0;
    const hasRating = rating != null && rating >= 0;
    const hasReviews = reviewCount != null && reviewCount >= 0;
    
    const defaultVariationId = getDefaultVariationId(product);
    
    const selectedVariationId = useProductVariationsStore(
        state => state.variations[productId]
    );
    
    // Приоритет: выбранная пользователем -> дефолтная -> productId
    const variationId = selectedVariationId || defaultVariationId;
    
    const currentVariation = variations.find(v => v.id === variationId);
    const variationLabel = currentVariation?.label;
    const currentPrice = currentVariation?.price ?? basePrice;
    
    const cartItems = useCartStore(state => state.items);
    const cartQuantity = cartItems[`${productId}__${variationId}`]?.quantity || 0;
    const isInCart = cartQuantity > 0;
    
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeItem = useCartStore(state => state.removeItem);

    if (!product) return null;
    
    const handleAddToCart = () => {
        if (!productId || !hasPrice) return;
        useCartStore.getState().addItem({
            productId,
            variationId,
            title,
            price: currentPrice,
            image,
            variationLabel,
        });
    };
    
    const handleQuantityChange = (newQuantity) => {
        updateQuantity(productId, variationId, newQuantity);
    };
    
    const handleRemove = () => {
        removeItem(productId, variationId);
    };
    
    return (
        <div className={classes.info}>
            <h1 className={classes.title}>{title}</h1>
            
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
                <span className={classes.price}>
                    {hasPrice ? `${formatNumber(currentPrice)} ₽` : 'Цена не указана'}
                </span>
                <span className={clsx(
                    classes.stock_status,
                    inStock ? classes.stock_status_in_stock : classes.stock_status_out_of_stock
                )}>
                    {inStock ? 'В наличии' : 'Нет в наличии'}
                </span>
            </div>
            
            {isInCart ? (
                <div className={classes.cart_controls}>
                    <QuantitySelector
                        value={cartQuantity}
                        onChange={handleQuantityChange}
                        onRemove={handleRemove}
                        allowZero={true}
                        size="large"
                    />
                    <Link to="/cart" className={classes.cart_link}>
                        <Icon icon={faArrowRight} size="sm" />
                        <span>в корзине</span>
                    </Link>
                </div>
            ) : (
                <Button 
                    variant="primary" 
                    fullWidth
                    disabled={!inStock || !hasPrice}
                    ariaLabel={`Добавить ${title} в корзину`}
                    OnClick={handleAddToCart}
                >
                    В корзину <Icon icon={faCartShopping} />
                </Button>
            )}
        </div>
    );
}