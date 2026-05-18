import classes from './styles/PostFooter.module.css';

export default function PostFooter({ date, isOwn }) {
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <footer className={classes.footer}>
            <time dateTime={date} className={classes.date}>{formattedDate}</time>
            {isOwn && <span className={classes.ownBadge}>Ваш пост</span>}
        </footer>
    );
}