import classes from './styles/Reaction.module.css';

import { IMAGES } from '../../../config/assetsConfig';

export default function Reaction({reactionImg = IMAGES.NO_IMG, reactionCount = 0}){
    return(
        <div className={classes.reaction}>
            <img src={reactionImg}/>
            <span>{reactionCount}</span>
        </div>
    );
}