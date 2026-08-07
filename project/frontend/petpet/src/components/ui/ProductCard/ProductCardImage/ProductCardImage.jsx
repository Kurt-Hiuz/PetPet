import classes from './styles/ProductCardImage.module.css';

import FavoriteToggle from '@features/FavoriteToggle/FavoriteToggle';

/**
 * Изображение товара с кнопкой избранного.
 * @param {Object} props
 * @param {string} props.imagePath - URL изображения
 * @param {string} props.productId - ID товара
 * @param {Object} [props.productData] - Нормализованные данные товара (для кэша избранного)
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