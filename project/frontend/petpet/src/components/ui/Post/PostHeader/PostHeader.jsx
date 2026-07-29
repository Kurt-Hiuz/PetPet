import classes from './styles/PostHeader.module.css';

import Avatar from '@ui/Avatar/Avatar';

export default function PostHeader({ author }) {
    const displayName = author.petName ? (
        <>
            <span className={classes.userName}>{author.userName}</span>
            <span className={classes.separator}>#</span>
            <span className={classes.petName}>{author.petName}</span>
        </>
    ) : (
        <span className={classes.userName}>{author.userName}</span>
    );

    return (
        <header className={classes.header}>
            <Avatar src={author.avatar} size="small" />
            <div className={classes.info}>{displayName}</div>
        </header>
    );
}