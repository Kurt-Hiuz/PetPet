import { useState, useEffect } from 'react';
import classes from './styles/ScrollToTop.module.css';
import Icon from '../Icon/Icon';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function ScrollToTop({ scrollContainerRef, threshold = 300 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Определяем целевой элемент скролла (костайнер или окно)
        const target = scrollContainerRef?.current || window;

        const handleScroll = () => {
            const scrollTop = target === window ? window.scrollY : target.scrollTop;
            setIsVisible(scrollTop > threshold);
        };

        target.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // начальная проверка при монтировании

        return () => target.removeEventListener('scroll', handleScroll);
    }, [scrollContainerRef, threshold]);

    const scrollToTop = () => {
        const target = scrollContainerRef?.current || window;
        target.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <button
            className={classes.button}
            onClick={scrollToTop}
            aria-label="Наверх"
            type="button"
        >
            <Icon icon={faArrowUp} size="lg" />
        </button>
    );
}