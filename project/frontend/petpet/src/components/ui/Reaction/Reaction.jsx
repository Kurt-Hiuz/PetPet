import classes from './styles/Reaction.module.css';

export default function Reaction({reactionImg = "/images/no-img.png", reactionCount = 0}){
    return(
        <div className={classes.reaction}>
            <img src={reactionImg}/>
            <span>{reactionCount}</span>
        </div>
    );
}