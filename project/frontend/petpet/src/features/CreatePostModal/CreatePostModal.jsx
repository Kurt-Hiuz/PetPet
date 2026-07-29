import Modal from '../../components/ui/ModalTrigger/Modal/Modal';
import Button from '../../components/ui/Button/Button';
import Avatar from '../../components/ui/Avatar/Avatar';
import Icon from '../../components/ui/Icon/Icon';
import PetCarousel from '../../components/ui/PetCarousel/PetCarousel';

import { usePetContext } from '../../shared/hooks/usePetContext';
import { getPetDraftKey, DRAFT_KEYS, DRAFT_UPDATED_EVENT } from '../../shared/constants/draftKeys';
import { faImage, faFilm, faTimes } from '@fortawesome/free-solid-svg-icons';

import clsx from 'clsx';
import classes from './styles/CreatePostModal.module.css';

import { useState, useEffect, useRef } from 'react';

const MAX_CAPTION_LENGTH = 2000;

/**
 * Модалка создания поста.
 * 
 * Логика:
 * - selectedPetId === null - пост от пользователя
 * - selectedPetId !== null - пост от питомца
 * - Клик по выбранному питомцу - сброс к null (пользователь)
 */
export default function CreatePostModal({ isOpen, onClose }) {
    const { pets, activePet, user } = usePetContext();
    const fileInputRef = useRef(null);
    
    const [selectedPetId, setSelectedPetId] = useState(activePet?.id ?? null);
    const [caption, setCaption] = useState('');
    const [media, setMedia] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    // Ключ для черновика
    const draftKey = selectedPetId === null
        ? DRAFT_KEYS.USER_POST
        : getPetDraftKey(selectedPetId);

    // Загрузка черновика
    useEffect(() => {
        if (!isOpen) return;

        try {
            const saved = localStorage.getItem(draftKey);
            if (saved) {
                const draft = JSON.parse(saved);
                setCaption(draft.caption ?? '');
                setMedia(draft.media ?? []);
            } else {
                setCaption('');
                setMedia([]);
            }
        } catch (err) {
            console.warn('Не удалось загрузить черновик:', err);
        }
    }, [isOpen, draftKey]);

    // Сохранение черновика
    useEffect(() => {
    if (!isOpen) return;

        const hasContent = caption.trim().length > 0 || media.length > 0;
        if (hasContent) {
            // Сохраняем только если есть реальный контент
            try {
                localStorage.setItem(draftKey, JSON.stringify({ caption, media }));
            } catch (err) {
                console.warn('Не удалось сохранить черновик:', err);
            }
        } else {
            // Удаляем ключ, если черновик пустой
            localStorage.removeItem(draftKey);
        }

        // Уведомляем ВСЕ слушатели (в т.ч. в текущей вкладке)
        window.dispatchEvent(
            new CustomEvent(DRAFT_UPDATED_EVENT, {
                detail: { key: draftKey, hasDraft: hasContent },
            })
        );
    }, [caption, media, draftKey, isOpen]);

    const clearDraft = () => {
        localStorage.removeItem(draftKey);
        window.dispatchEvent(
            new CustomEvent(DRAFT_UPDATED_EVENT, {
                detail: { key: draftKey, hasDraft: false },
            })
        );
    };

    // Toggle: клик по выбранному питомцу - сброс к пользователю
    const handleSelectPet = (petId) => {
        setSelectedPetId((prev) => (prev === petId ? null : petId));
    };

    const canPublish = caption.trim().length > 0 || media.length > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canPublish) return;

        const payload = {
            authorType: selectedPetId === null ? 'user' : 'pet',
            authorId: selectedPetId,
            caption: caption.trim(),
            media,
        };

        console.log('Создание поста:', payload);
        // TODO: мутация через React Query

        clearDraft();
        setCaption('');
        setMedia([]);
        onClose();
    };

    // Drag-and-drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const newMedia = files.map((file) => ({
            type: file.type.startsWith('video') ? 'video' : 'image',
            file,
            preview: URL.createObjectURL(file),
        }));
        setMedia((prev) => [...prev, ...newMedia]);
    };

    const removeMedia = (index) => {
        setMedia((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            const removed = prev[index];
            if (removed?.preview) {
                URL.revokeObjectURL(removed.preview);
            }
            return updated;
        });
    };

    // Активный автор
    const activeAuthor = selectedPetId === null
        ? { type: 'user', avatar: user?.avatar, name: user?.name ?? 'Вы' }
        : { type: 'pet', ...pets.find((p) => p.id === selectedPetId) };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="wide">
            <form className={classes.form} onSubmit={handleSubmit}>
                {/* Заголовок */}
                <header className={classes.header}>
                    <h2 className={classes.title}>Новая публикация</h2>
                    <div className={classes.authorInfo}>
                        <Avatar
                            src={activeAuthor.avatar}
                            alt={activeAuthor.name}
                            size="small"
                        />
                        <span className={classes.authorName}>
                            {activeAuthor.type === 'user'
                                ? 'От моего имени'
                                : `От имени ${activeAuthor.name}`}
                        </span>
                    </div>
                </header>

                {/* Карусель питомцев */}
                <fieldset className={classes.authorFieldset}>
                    <legend className={classes.legend}>От чьего имени публикуем?</legend>
                    <PetCarousel
                        pets={pets}
                        selectedPetId={selectedPetId}
                        onSelect={handleSelectPet}
                    />
                </fieldset>

                {/* Textarea + счётчик символов */}
                <div className={classes.field}>
                    <div className={classes.labelRow}>
                        <label htmlFor="post-caption" className={classes.label}>
                            Что нового?
                        </label>
                        <span
                            className={clsx(classes.charCount, {
                                [classes.charCountWarning]: caption.length > MAX_CAPTION_LENGTH * 0.9,
                            })}
                        >
                            {caption.length} / {MAX_CAPTION_LENGTH}
                        </span>
                    </div>
                    <textarea
                        id="post-caption"
                        className={classes.textarea}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Расскажите, как прошёл день..."
                        rows={4}
                        maxLength={MAX_CAPTION_LENGTH}
                    />
                </div>

                {/* Зона загрузки медиа */}
                <div className={classes.field}>
                    <label className={classes.label}>Медиа</label>
                    <div
                        className={clsx(classes.mediaZone, {
                            [classes.mediaZoneDragging]: isDragging,
                        })}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleFileSelect}
                            className={classes.fileInput}
                        />
                        <div className={classes.mediaIcons}>
                            <Icon icon={faImage} className={classes.mediaIcon} />
                            <Icon icon={faFilm} className={classes.mediaIcon} />
                        </div>
                        <span className={classes.mediaText}>
                            {isDragging
                                ? 'Отпустите файлы здесь'
                                : 'Перетащите фото/видео или нажмите для выбора'}
                        </span>
                    </div>

                    {/* Превью медиа */}
                    {media.length > 0 && (
                        <div className={classes.mediaPreview}>
                            {media.map((item, index) => (
                                <div key={index} className={classes.mediaItem}>
                                    {item.type === 'image' ? (
                                        <img src={item.preview} alt="" className={classes.mediaThumb} />
                                    ) : (
                                        <video src={item.preview} className={classes.mediaThumb} />
                                    )}
                                    <button
                                        type="button"
                                        className={classes.mediaRemove}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeMedia(index);
                                        }}
                                        aria-label="Удалить медиа"
                                    >
                                        <Icon icon={faTimes} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <footer className={classes.footer}>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button type="submit" variant="primary" disabled={!canPublish}>
                        Опубликовать
                    </Button>
                </footer>
            </form>
        </Modal>
    );
}