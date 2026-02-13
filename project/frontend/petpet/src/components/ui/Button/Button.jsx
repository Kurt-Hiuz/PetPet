import classes from './styles/Button.module.css';

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
    const buttonsClasses = [
        classes.button,
        classes[variant],
        classes[size],
        fullWidth && classes.full_size,
        (disabled || loading) && classes.disabled,
        classList
    ].filter(Boolean).join(" ");
    
    return (
        <button
            type={type}
            className={buttonsClasses}
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