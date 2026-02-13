import classes from './styles/Avatar.module.css';

export default function Avatar({src = "/images/no-img.png", size = "medium", alt = "Аватарка", className}){
    const avatarClasses = [
        classes.avatar,
        classes[size],
        className
    ].filter(Boolean).join(" ");

    return(
        <img
            src={src}
            alt={alt}
            className={avatarClasses}
        />
    );
}