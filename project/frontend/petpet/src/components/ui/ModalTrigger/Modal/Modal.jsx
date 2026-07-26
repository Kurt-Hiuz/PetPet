import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import clsx from 'clsx';
import classes from './styles/Modal.module.css';

/**
 * Базовый контейнер модального окна.
 * Отвечает ТОЛЬКО за:
 *  - overlay с затемнением
 *  - блокировку скролла body
 *  - закрытие по Escape и клику на overlay
 *  - рендер в document.body через createPortal
 *
 * Бизнес-логику (формы, кнопки, валидацию) сюда НЕ класть -
 * для этого создаются отдельные компоненты в features/.
 */
export default function Modal({
    isOpen,
    onClose,
    children,
    size = 'medium',
    closeOnOverlay = true,
}) {
    // 1. Блокируем скролл body, пока модалка открыта
    useEffect(() => {
        if (!isOpen) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen]);

    // 2. Закрытие по Escape
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') onClose();
        },
        [onClose]
    );

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    // 3. Клик по overlay (но не по самой карточке) — закрываем
    const handleOverlayClick = (e) => {
        if (closeOnOverlay && e.target === e.currentTarget) {
            onClose();
        }
    };

  // 4. createPortal — рендерим в document.body,
  // чтобы z-index работал корректно и модалка не обрезалась
  // overflow: hidden родителей
    return createPortal(
        <div
            className={classes.overlay}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
        >
            <div className={clsx(classes.modal, classes[size])}>
                {children}
            </div>
        </div>,
        document.body
    );
}