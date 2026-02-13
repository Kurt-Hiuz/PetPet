import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart }  from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart }  from '@fortawesome/free-regular-svg-icons';

import classes from './styles/LikeIcon.module.css'

export default function LikeIcon(){
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    };

    return(
        <FontAwesomeIcon 
            icon={liked ? solidHeart : regularHeart} 
            className={classes.like_icon}
            style={{color: liked ? 'red' : '#989794'}}
            onClick={handleClick}/>
    );
}