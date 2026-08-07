import classes from './styles/ReviewItem.module.css';

import Avatar from '@ui/Avatar/Avatar';
import Icon from '@ui/Icon/Icon';

import { faStar } from '@fortawesome/free-solid-svg-icons';

/**
 * @param {Object} props
 * @param {Object} props.review
 * @param {Object} props.review.author - { name, avatar }
 * @param {number} props.review.rating - 1-5
 * @param {string} props.review.text
 * @param {string} props.review.date
 */
export default function ReviewItem({ review }) {
    return (
        <article className={classes.review}>
            <header className={classes.header}>
                <Avatar 
                    src={review.author?.avatar} 
                    alt={review.author?.name || 'Пользователь'}
                    size="small"
                />
                <div className={classes.author_info}>
                    <span className={classes.author_name}>
                        {review.author?.name || 'Аноним'}
                    </span>
                    <time dateTime={review.date} className={classes.date}>
                        {review.date 
                            ? new Date(review.date).toLocaleDateString('ru-RU') 
                            : ''}
                    </time>
                </div>
                <div className={classes.rating}>
                    {[...Array(5)].map((_, i) => (
                        <Icon 
                            key={i}
                            icon={faStar}
                            color={i < (review.rating || 0) ? '#ffd20a' : '#ddd'}
                            size="sm"
                        />
                    ))}
                </div>
            </header>
            <p className={classes.text}>{review.text}</p>
        </article>
    );
}