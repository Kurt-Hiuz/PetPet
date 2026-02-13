import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Icon(
    {
        icon,
        size = "1x",
        color = "white",
        ...rest
    }
){
    return(
        <FontAwesomeIcon icon={icon} size={size} color={color} {...rest}/>
    );
}