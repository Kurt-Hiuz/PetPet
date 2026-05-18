import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

export default function Icon(
    {
        icon,
        size = "1x",
        color,
        className,
        style,
        ...rest
    }
){
    const combinedStyle = color ? { color, ...style } : style;

    return(
        <FontAwesomeIcon 
            icon={icon} 
            size={size}
            className={clsx('icon', className)} // базовый класс + внешние
            style={combinedStyle} 
            {...rest}/>
    );
}