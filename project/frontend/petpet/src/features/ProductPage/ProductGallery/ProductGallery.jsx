import classes from './styles/ProductGallery.module.css';

import { IMAGES } from '@config/assetsConfig';

/**
 * Галерея изображений товара.
 * @param {Object} props
 * @param {string[]} props.images - Массив URL изображений
 * @todo В будущем: карусель с миниатюрами, зум, свайпы на мобильных
 */
export default function ProductGallery({ images }) {
    const mainImage = images?.[0] || IMAGES.NO_IMG;
    
    return (
        <div className={classes.gallery}>
            <div className={classes.main_image_wrapper}>
                <img 
                    src={mainImage} 
                    alt="Главное изображение товара"
                    className={classes.main_image}
                    loading="lazy"
                    decoding="async"
                />
            </div>
            {/* В будущем здесь будут миниатюры:
            {images.length > 1 && (
                <div className={classes.thumbnails}>
                    {images.map((img, idx) => (
                        <Thumbnail key={idx} src={img} />
                    ))}
                </div>
            )}
            */}
        </div>
    );
}