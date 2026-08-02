import classes from './styles/ProductCardImage.module.css';

import FavoriteToggle from '@features/Favorites/FavoriteToggle/FavoriteToggle';

/**
 * @param {Object} props
 * @param {string} props.imagePath
 * @param {string} props.productId
 * @param {Object} [props.productData] - Полные данные товара (для кэша избранного)
 */
export default function ProductCardImage({ imagePath, productId, productData }) {
    return (
        <div className={classes.img_wrapper}>
            {productId && (
                <FavoriteToggle
                    productId={productId}
                    productData={productData} // Передаём данные для кэша
                />
            )}
            <img
                src={imagePath}
                alt="Картинка товара"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
}