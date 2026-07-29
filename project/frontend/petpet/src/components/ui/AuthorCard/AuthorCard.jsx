import Avatar from '@ui/Avatar/Avatar';
import Icon from '@ui/Icon/Icon';

import { faPencil } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';
import classes from './styles/AuthorCard.module.css';

/**
 * Презентационный компонент карточки автора (питомца).
 *
 * @param {Object} props
 * @param {Object} props.author — объект автора {id, name, avatar}
 * @param {boolean} props.isSelected — выбрана ли карточка
 * @param {boolean} [props.hasDraft=false] — есть ли черновик для этого автора
 * @param {() => void} props.onClick — колбэк клика
 */
export default function AuthorCard({ author, isSelected, hasDraft = false, onClick }) {
    return (
        <button
            type="button"
            className={clsx(classes.authorCard, {
                [classes.authorCardActive]: isSelected,
            })}
            onClick={onClick}
            aria-pressed={isSelected}
            aria-label={
                hasDraft
                    ? `От имени ${author.name}, есть несохранённый черновик`
                    : `От имени ${author.name}`
            }
        >
            <div className={classes.avatarWrapper}>
                <Avatar src={author.avatar} alt={author.name} size="medium" />
                {hasDraft && (
                    <span className={classes.draftBadge} aria-hidden="true">
                        <Icon icon={faPencil} className={classes.draftIcon} />
                    </span>
                )}
            </div>
            <span className={classes.authorName}>{author.name}</span>
        </button>
    );
}