import classes from './styles/PostDescription.module.css';

import Reaction from '../../Reaction/Reaction';

export default function PostDescription({descriptionData}){
    const description = {
        text: descriptionData.text ?? "Пустое содержимое",
        reactions: Array.isArray(descriptionData?.reactions) ? descriptionData.reactions : [],
        commentsCount: descriptionData.commentsCount ?? "-1"
    }
    
    return(
        <div className={classes.post_description}>
            <p>{description.text}</p>
            <div className={classes.reactions}>
                {description.reactions.map(
                    (reaction) => 
                    <Reaction
                        key={reaction.reactionImg}
                        reactionImg={reaction.reactionImg} 
                        reactionCount={reaction.reactionCount}
                    /> 
                )}
            </div>
            {/* TODO: сделать нормальную логику склонения слова "комментариев" */}
            <p>{description.commentsCount} комментариев</p>
        </div>
    );
}