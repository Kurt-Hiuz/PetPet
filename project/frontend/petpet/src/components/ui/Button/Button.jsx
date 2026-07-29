import classes from './styles/Button.module.css';

import clsx from 'clsx';

export default function Button({
    children,
    icon,
    OnClick,
    variant = "primary",
    size = "medium",
    type = "button",
    fullWidth = false,
    disabled = false,
    loading = false,
    classList = "",
    ariaLabel,
    ...rest
}){
    
    return (
        <button
            type={type}
            className={clsx(
                classes.button,
                classes[variant],
                classes[size],
                fullWidth && classes.full_size,
                classList
            )}
            onClick={OnClick}
            disabled={disabled || loading}
            aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
            aria-busy={loading} // Для скринридеров: кнопка занята
            
            {...rest}
        >
            {icon && (!loading || disabled) && (
                <span className={classes.icon}>{icon}</span>
            )}
            {loading ? "Загрузка..." : children}
        </button>
    );
}