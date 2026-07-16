import { useRef, useState, useEffect, useCallback } from 'react';
import classes from './styles/PetSwitcher.module.css';
import clsx from 'clsx';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

/**
 * @typedef {Object} Pet
 * @property {string|number} id
 * @property {string} name
 * @property {string} avatar
 */

/**
 * Карусель питомцев с горизонтальным скроллом и кнопками навигации.
 * 
 * @param {Object} props
 * @param {Pet[]} props.pets - Массив питомцев
 * @param {number} [props.visibleCount=3] - Сколько питомцев показывать одновременно
 * @param {string} [props.avatarSize="medium"] - Размер аватарки (small/medium/large)
 */
export default function PetSwitcher({ 
    pets, 
    visibleCount = 3, 
    avatarSize = "medium" 
}) {
    const hasMore = pets.length > visibleCount;
    const scrollContainerRef = useRef(null);

    // Флаги "можно ли скроллить в эту сторону"
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(hasMore);
    
    // Количество скрытых питомцев слева/справа
    const [hiddenLeft, setHiddenLeft] = useState(0);
    const [hiddenRight, setHiddenRight] = useState(hasMore ? pets.length - visibleCount : 0);

    // Пересчитываем состояние кнопок и счётчиков на основе реального scrollLeft
    const updateScrollState = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        
        const { scrollLeft, scrollWidth, clientWidth } = el;
        
        // 1px — допуск на погрешность дробных пикселей
        setCanScrollLeft(scrollLeft > 1);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        
        // Вычисляем количество прокрученных питомцев
        const firstItem = el.firstElementChild;
        if (!firstItem) return;
        
        const itemWidth = firstItem.offsetWidth;
        const gap = 12;
        const scrollStep = itemWidth + gap;
        
        // Сколько питомцев прокручено влево (округляем для стабильности)
        const scrolledCount = Math.round(scrollLeft / scrollStep);
        
        // Скрыто слева = сколько прокрутили
        setHiddenLeft(scrolledCount);
        
        // Скрыто справа = всего скрытых - прокрученных влево
        const totalHidden = pets.length - visibleCount;
        setHiddenRight(Math.max(0, totalHidden - scrolledCount));
    }, [pets.length, visibleCount]);

    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el || !hasMore) return;

        updateScrollState();

        el.addEventListener('scroll', updateScrollState, { passive: true });
        window.addEventListener('resize', updateScrollState);

        return () => {
            el.removeEventListener('scroll', updateScrollState);
            window.removeEventListener('resize', updateScrollState);
        };
    }, [hasMore, updateScrollState]);

    // Прокрутка на 1 питомца
    const handleScroll = (direction) => {
        const el = scrollContainerRef.current;
        if (!el) return;

        const firstItem = el.firstElementChild;
        if (!firstItem) return;

        const itemWidth = firstItem.offsetWidth;
        const gap = 12;
        const scrollAmount = (itemWidth + gap) * direction;

        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className={classes.petSwitcher} style={{ '--visible-count': visibleCount }}>
            <div
                ref={scrollContainerRef}
                className={clsx(classes.petsList, {
                    [classes.scrollable]: hasMore,
                })}
            >
                {pets.map((pet) => (
                    <div key={pet.id} className={classes.petItem}>
                        <Avatar
                            src={pet.avatar}
                            alt={pet.name}
                            size={avatarSize}
                            className={classes.petAvatar}
                        />
                    </div>
                ))}
            </div>

            {hasMore && (
                <>
                    <button
                        type="button"
                        className={clsx(classes.arrowButton, classes.arrowLeft, {
                            [classes.hidden]: !canScrollLeft,
                        })}
                        onClick={() => handleScroll(-1)}
                        disabled={!canScrollLeft}
                        aria-label="Предыдущие питомцы"
                    >
                        <Icon icon={faAngleLeft} />
                        {/* Счётчик скрытых питомцев слева */}
                        {hiddenLeft > 0 && (
                            <span className={classes.hiddenCount}>
                                +{hiddenLeft}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        className={clsx(classes.arrowButton, classes.arrowRight, {
                            [classes.hidden]: !canScrollRight,
                        })}
                        onClick={() => handleScroll(1)}
                        disabled={!canScrollRight}
                        aria-label="Следующие питомцы"
                    >
                        <Icon icon={faAngleRight} />
                        {/* Счётчик скрытых питомцев справа */}
                        {hiddenRight > 0 && (
                            <span className={classes.hiddenCount}>
                                +{hiddenRight}
                            </span>
                        )}
                    </button>
                </>
            )}
        </div>
    );
}