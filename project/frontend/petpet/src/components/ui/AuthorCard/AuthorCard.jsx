import Avatar from '../Avatar/Avatar';

import clsx from 'clsx';
import classes from './styles/AuthorCard.module.css';

export default function AuthorCard({ author, isSelected, onClick }) {
    return (
        <button
            type="button"
            className={clsx(classes.authorCard, {
                [classes.authorCardActive]: isSelected,
            })}
            onClick={onClick}
            aria-pressed={isSelected}
            aria-label={`От имени ${author.name}`}
        >
            <Avatar src={author.avatar} alt={author.name} size="medium" />
            <span className={classes.authorName}>{author.name}</span>
        </button>
    );
}