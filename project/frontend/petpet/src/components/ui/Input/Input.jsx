import classes from './styles/Input.module.css';

import Icon from '../Icon/Icon';

export default function Input({
    type = "text",
    icon,
    iconPosition = "left",
    id,
    label,
    error,
    className = "",
    ...rest
}) {
    const inputClass = [
        classes.input,
        icon && classes[`hasIcon${iconPosition === 'left' ? 'Left' : 'Right'}`],
        error ? classes.error : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <div className={classes.wrapper}>
            {label && (
                <label htmlFor={id} className={classes.label}>
                    {label}
                </label>
            )}
            <div className={classes.inputWrapper}>
                {icon && (
                    <span
                        className={`${classes.icon} ${classes[`icon${iconPosition === 'left' ? 'Left' : 'Right'}`]}`}
                        aria-hidden="true"
                    >
                        <Icon icon={icon} color='black'/>
                    </span>
                )}
                <input
                    type={type}
                    className={inputClass}
                    {...rest}
                />
            </div>
            {error && (
                <span className={classes.errorMessage}>{error}</span>
            )}
        </div>
    );
}