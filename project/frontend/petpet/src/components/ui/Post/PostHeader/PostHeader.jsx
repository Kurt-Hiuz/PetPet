import classes from './styles/PostHeader.module.css';

import Avatar from '../../Avatar/Avatar';

export default function PostHeader({headerData}){
    const header = {
        avatarSrc: headerData.avatarSrc ?? "/images/no-img.png",
        userName: headerData.userName ?? "Нет имени пользователя",
        petsName: headerData.petsName ?? "Нет имени питомца"
    }
    
    return(
        <div className={classes.post_header}>
            <Avatar src={header.avatarSrc} size='small'/>
            <span>{header.userName}#{header.petsName}</span>
        </div>
    );
}