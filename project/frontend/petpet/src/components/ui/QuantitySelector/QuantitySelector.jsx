import { useState, useEffect } from 'react';

import classes from './styles/QuantitySelector.module.css';

import Icon from '@ui/Icon/Icon';

import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

/**
 * Переиспользуемый счётчик количества с возможностью ручного ввода.
 * 
 * @param {Object} props
 * @param {number} props.value - Текущее количество
 * @param {Function} props.onChange - Callback при изменении (получает новое число)
 * @param {Function} [props.onRemove] - Callback при достижении 0 (если allowZero=true)
 * @param {number} [props.min=1] - Минимальное значение (при allowZero=false)
 * @param {number} [props.max=99] - Максимальное значение
 * @param {string} [props.size='medium'] - small | medium | large
 * @param {boolean} [props.allowZero=false] - Разрешить 0 (вызовет onRemove)
 * @param {boolean} [props.disabled=false]
 */
export default function QuantitySelector({ 
    value, 
    onChange, 
    onRemove,
    min = 1, 
    max = 99,
    size = 'medium',
    allowZero = false,
    disabled = false 
}) {
    // Локальный state для input — синхронизируется с value из пропсов
    const [inputValue, setInputValue] = useState(String(value));
    
    // Синхронизация с внешним value (если изменился извне)
    useEffect(() => {
        setInputValue(String(value));
    }, [value]);
    
    const effectiveMin = allowZero ? 0 : min;
    
    const handleDecrement = () => {
        const newValue = value - 1;
        if (newValue === 0 && allowZero && onRemove) {
            onRemove();
        } else if (newValue >= effectiveMin) {
            onChange(newValue);
        }
    };
    
    const handleIncrement = () => {
        if (value < max) onChange(value + 1);
    };
    
    // Обработка ручного ввода
    const handleInputChange = (e) => {
        const raw = e.target.value;
        
        // Пустое поле — разрешаем (пользователь ещё печатает)
        if (raw === '') {
            setInputValue('');
            return;
        }
        
        // Только цифры
        if (!/^\d+$/.test(raw)) return;
        
        const num = parseInt(raw, 10);
        if (isNaN(num)) return;
        
        // Ограничение сверху
        if (num > max) {
            onChange(max);
            setInputValue(String(max));
            return;
        }
        
        // Ноль — удаляем товар (если разрешено)
        if (num === 0) {
            if (allowZero && onRemove) {
                onRemove();
            } else {
                onChange(min);
                setInputValue(String(min));
            }
            return;
        }
        
        // Валидное число — обновляем
        onChange(num);
    };
    
    // При потере фокуса — валидируем значение
    const handleBlur = () => {
        if (inputValue === '' || parseInt(inputValue, 10) < effectiveMin) {
            onChange(effectiveMin);
        }
    };
    
    // При нажатии Enter — применяем и убираем фокус
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };
    
    return (
        <div className={`${classes.selector} ${classes[size]}`}>
            <button
                type="button"
                className={classes.btn}
                onClick={handleDecrement}
                disabled={disabled || value <= effectiveMin}
                aria-label="Уменьшить количество"
            >
                <Icon icon={faMinus} size="xs" />
            </button>
            
            <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={classes.input}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-label="Количество товара"
            />
            
            <button
                type="button"
                className={classes.btn}
                onClick={handleIncrement}
                disabled={disabled || value >= max}
                aria-label="Увеличить количество"
            >
                <Icon icon={faPlus} size="xs" />
            </button>
        </div>
    );
}