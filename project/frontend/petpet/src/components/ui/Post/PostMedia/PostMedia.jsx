import classes from './styles/PostMedia.module.css';
import { MEDIA_RENDERERS } from './renderers/index';

export default function PostMedia({ media = [] }) {
    if (media.length === 0) return null; // TODO: посмотреть, что можно сделать с null - и нужно ли что-то делать с этим

    return (
        <div className={classes.mediaContainer}>
            {media.map((item, idx) => {
                const Renderer = MEDIA_RENDERERS[item.type] || null;
                if (!Renderer) return <p>{MEDIA_RENDERERS.NO_RENDER}</p>;
                
                return (
                    <div key={idx} className={classes.itemWrapper}>
                        <Renderer {...item} className={classes.media}/>
                    </div>
                );
            })}
        </div>
    );
}