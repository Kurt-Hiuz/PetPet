import { useState, useCallback } from 'react';
import { useFavoritesStore } from '@shared/store/favoritesStore';

import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';

import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import clsx from 'clsx';
import classes from './styles/FavoriteToggle.module.css';

/**
 * @param {Object} props
 * @param {string} props.productId - ID товара
 * @param {Object} [props.productData] - Полные данные товара (для кэша)
 * @param {string} [props.className] - Дополнительные CSS-классы
 */
export default function FavoriteToggle({ productId, productData, className }) {
    const isFavorite = useFavoritesStore(state => state.favoriteIds.includes(productId));
    const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
    
    const [isAnimating, setIsAnimating] = useState(false);
    
    const handleClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Передаём productData для сохранения в кэш
        toggleFavorite(productId, productData);
        
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
    }, [productId, productData, toggleFavorite]);
    
    const ariaLabel = isFavorite ? 'Удалить из избранного' : 'Добавить в избранное';
    
    return (
        <div className={clsx(classes.wrapper, className)}>
            <Button
                variant="secondary"
                classList={clsx(
                    classes.toggle_button,
                    isFavorite && classes.toggle_button_active,
                    isAnimating && classes.toggle_button_animating
                )}
                OnClick={handleClick}
                ariaLabel={ariaLabel}
                type="button"
            >
                <Icon
                    icon={isFavorite ? faHeartSolid : faHeartRegular}
                    color={isFavorite ? '#ff4757' : '#555'}
                    size="1x"
                />
            </Button>
        </div>
    );
}