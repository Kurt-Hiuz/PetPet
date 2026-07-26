import { useState, cloneElement, isValidElement } from 'react';
import Modal from './Modal/Modal';

/**
 * Compound-компонент, который инкапсулирует состояние открытия модалки.
 * Родитель не знает про isOpen/onClose - всё внутри.
 *
 * Как работает:
 * 1. cloneElement + onClick - навешиваем свой обработчик на child (триггер)
 * 2. При клике - toggle состояния
 * 3. Рендерим Modal с переданным содержимым
 *
 * @param {Object} props
 * @param {React.ReactElement} props.children - триггер (кнопка, ссылка и т.п.)
 * @param {React.ReactElement} props.modal - содержимое модалки (должен принимать isOpen/onClose)
 * @param {Object} [props.modalProps] - доп. пропсы для модалки (size, closeOnOverlay и т.п.)
 */
export default function ModalTrigger({ children, modal, modalProps = {} }) {
    const [isOpen, setIsOpen] = useState(false);

    // Валидация: children должен быть React-элементом, чтобы cloneElement работал
    if (!isValidElement(children)) {
        console.warn('ModalTrigger: children должен быть React-элементом');
        return null;
    }

    // Навешиваем onClick на триггер, сохраняя его оригинальный onClick (если был)
    const triggerWithClick = cloneElement(children, {
        onClick: (e) => {
            // Вызываем оригинальный onClick, если он есть
            if (typeof children.props.onClick === 'function') {
                children.props.onClick(e);
            }
            setIsOpen(true);
        },
    });

    // Модалка получает isOpen и onClose автоматически
    const modalWithProps = cloneElement(modal, {
        isOpen,
        onClose: () => setIsOpen(false),
        ...modalProps,
    });

    return (
        <>
            {triggerWithClick}
            {modalWithProps}
        </>
    );
}