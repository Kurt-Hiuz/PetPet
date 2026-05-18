// import classes from './styles/PostHeader.module.css';

// import Avatar from '../../Avatar/Avatar';

// export default function PostHeader({headerData}){
//     const header = {
//         avatarSrc: headerData.avatarSrc ?? "/images/no-img.png",
//         userName: headerData.userName ?? "Нет имени пользователя",
//         petsName: headerData.petsName ?? "Нет имени питомца"
//     }
    
//     return(
//         <div className={classes.post_header}>
//             <Avatar src={header.avatarSrc} size='small'/>
//             <span>{header.userName}#{header.petsName}</span>
//         </div>
//     );
// }

import classes from './styles/PostHeader.module.css';

import Avatar from '../../Avatar/Avatar';

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