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
            {...rest}

            aria-busy={loading} // Для скринридеров: кнопка занята
            aria-label={loading ? 'Загрузка...' : undefined}
        >
            {icon && (!loading || disabled) && (
                <span className={classes.icon}>{icon}</span>
            )}
            {loading ? "Загрузка..." : children}
        </button>
    );
}