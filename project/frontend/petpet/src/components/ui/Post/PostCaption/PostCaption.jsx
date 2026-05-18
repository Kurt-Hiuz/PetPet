import classes from './styles/PostCaption.module.css';

export default function PostCaption({ text }) {
    if (!text) return null;
    
    // В будущем здесь можно добавить "Развернуть/Свернуть" для длинных текстов
    return <p className={classes.caption}>{text}</p>;
}