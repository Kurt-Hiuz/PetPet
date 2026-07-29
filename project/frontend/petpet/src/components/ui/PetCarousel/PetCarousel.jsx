import Icon from '../Icon/Icon';
import AuthorCard from '../AuthorCard/AuthorCard';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import classes from './styles/PetCarousel.module.css';
import clsx from 'clsx';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';

import { useDraftStatus } from '../../../shared/hooks/useDraftStatus';

const VISIBLE_COUNT = 3;

/**
 * Количество клонов с каждой стороны для бесшовного loop.
 * Должно быть >= VISIBLE_COUNT - 1, чтобы при jump не было пустых слотов.
 */
const CLONE_COUNT = VISIBLE_COUNT - 1;

/**
 * Бесшовная карусель питомцев.
 *
 * Поведение:
 * - Если питомцев <= 3 - простой список без кнопок
 * - Если питомцев > 3 - карусель с кнопками, ВСЕГДА показывает ровно 3 питомца
 * - Бесконечный loop через клонирование границ
 */
export default function PetCarousel({ pets, selectedPetId, onSelect }) {
    // Начальный индекс - на первом реальном питомце (после левых клонов)
    const [currentIndex, setCurrentIndex] = useState(CLONE_COUNT);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const trackRef = useRef(null);

    // Ref для актуального currentIndex - используется в handleTransitionEnd
    const currentIndexRef = useRef(currentIndex);
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    // Мемоизируем petIds, чтобы useDraftStatus не пересчитывался при каждом рендере
    const petIds = useMemo(() => pets.map((p) => p.id), [pets]);
    
    // Проверяем наличие черновиков — один раз при монтировании + подписка на storage event
    const draftPetIds = useDraftStatus(petIds);

    // Расширенный массив вынесен в useMemo, чтобы не пересоздавать при каждом рендере
    const extendedPets = [
        ...pets.slice(-CLONE_COUNT),
        ...pets,
        ...pets.slice(0, CLONE_COUNT),
    ];

    const shift = useCallback((direction) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + direction);
    }, [isAnimating]);

    // Wheel-обработчик - прокрутка карусели колесом мыши
    useEffect(() => {
        const track = trackRef.current;
        if (!track || pets.length <= VISIBLE_COUNT) return;

        let wheelTimeout;
        const handleWheel = (e) => {
            e.preventDefault();
            if (wheelTimeout) return;
            
            wheelTimeout = setTimeout(() => {
                wheelTimeout = null;
            }, 150);
            
            if (e.deltaY > 0) {
                shift(1);
            } else if (e.deltaY < 0) {
                shift(-1);
            }
        };

        track.addEventListener('wheel', handleWheel, { passive: false });
        return () => track.removeEventListener('wheel', handleWheel);
    }, [pets.length, shift]);

    if (pets.length <= VISIBLE_COUNT) {
        return (
            <div className={classes.simpleList}>
                {pets.map((pet) => (
                    <AuthorCard
                        key={pet.id}
                        author={pet}
                        isSelected={pet.id === selectedPetId}
                        hasDraft={draftPetIds.has(pet.id)}
                        onClick={() => onSelect(pet.id)}
                    />
                ))}
            </div>
        );
    }

    const handleTransitionEnd = () => {
        const currentIdx = currentIndexRef.current;

        // Достигли левого клона (индекс 0) - jump на эквивалент в середине
        if (currentIdx === 0) {
            setIsTransitioning(false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setCurrentIndex(pets.length);
                    setIsTransitioning(true);
                    setIsAnimating(false);
                });
            });
        }
        // Достигли правого клона - jump на эквивалент в середине
        else if (currentIdx === extendedPets.length - VISIBLE_COUNT) {
            setIsTransitioning(false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setCurrentIndex(extendedPets.length - VISIBLE_COUNT - pets.length);
                    setIsTransitioning(true);
                    setIsAnimating(false);
                });
            });
        } else {
          // Обычное завершение анимации - просто разблокируем
            setIsAnimating(false);
        }
    };

    // Смещение track в процентах
    const offset = -(currentIndex * (100 / VISIBLE_COUNT));
    const trackStyle = {
        transform: `translateX(${offset}%)`,
        transition: isTransitioning ? 'transform 0.4s ease' : 'none',
    };

    return (
        <div className={classes.carousel}>
            <div ref={trackRef} className={classes.viewport}>
                <div
                    className={classes.track}
                    style={trackStyle}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {extendedPets.map((pet, index) => (
                        <AuthorCard
                            key={`${pet.id}-${index}`}
                            author={pet}
                            isSelected={pet.id === selectedPetId && index === currentIndex}
                            hasDraft={draftPetIds.has(pet.id)}
                            onClick={() => onSelect(pet.id)}
                        />
                    ))}
                </div>
            </div>
            
            <button
                type="button"
                className={clsx(classes.arrow, classes.arrowLeft)}
                onClick={() => shift(-1)}
                aria-label="Предыдущий"
            >
                <Icon icon={faChevronLeft} />
            </button>
            
            <button
                type="button"
                className={clsx(classes.arrow, classes.arrowRight)}
                onClick={() => shift(1)}
                aria-label="Следующий"
            >
                <Icon icon={faChevronRight} />
            </button>
        </div>
    );
}