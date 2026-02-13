import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from "./styles/IconButton.module.css";

export default function IconButton({
    icon,
    label,
    variant = "default",
    disabled = false,
    onClick,
    classList = ""
}){
    const iconsClasses = [
        classes.iconButton,
        classes[variant],
        disabled && classes.disabled,
        classList
    ].filter(Boolean).join(" ");

    return(
        <button
            type="button"
            className={iconsClasses}
            onClick={onClick}
            aria-label={label}
            disabled={disabled}
        >
            <FontAwesomeIcon icon={icon}/>
        </button>
    );
}