import classes from './styles/PostActions.module.css';

import { REACTIONS_CONFIG } from '@config/reactionsConfig';

import Icon from '@ui/Icon/Icon';
import { faComment, faShare } from '@fortawesome/free-solid-svg-icons';

import { pluralizeComments } from '@utils/pluralize';
import { formatCount } from '@utils/formatCount';

// export default function PostActions({ stats, postId }) { // - заготовка под посты с id
export default function PostActions({ stats }) {
    const rawComments = stats.comments || 0;
    
    const commentsLabel = `${formatCount(rawComments)} ${pluralizeComments(rawComments)}`;

    return (
        <div className={classes.actions}>
            <div className={classes.reactionsRow}>
                {REACTIONS_CONFIG.map(({ key, icon, label }) => {

                    const count = stats[key] ?? 0;

                    return (
                    <button 
                        key={key} 
                        className={classes.actionBtn}
                        aria-label={label}
                        // TODO: В будущем: onClick={() => handleReaction(postId, key)}
                    >
                        <Icon icon={icon} />
                        <span>{formatCount(count)}</span>
                    </button>
                    );
                })}
            </div>
            
            <div className={classes.secondaryActions}>
                <button className={classes.commentBtn} aria-label={commentsLabel}>
                    <Icon icon={faComment} />
                    <span>{commentsLabel}</span>
                </button>

                <button className={classes.repostBtn} aria-label="Репост">
                    <Icon icon={faShare} />
                    <span>{formatCount(stats.reposts || 0)}</span>
                </button>
            </div>
        </div>
    );
}