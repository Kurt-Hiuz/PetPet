import { useState, useRef } from 'react';

import clsx from 'clsx';
import classes from './styles/AddPetModal.module.css';

import Modal from '@ui/ModalTrigger/Modal/Modal';
import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';
import Avatar from '@ui/Avatar/Avatar';

import { usePetContext } from '@shared/hooks/usePetContext';

import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons';

const MAX_DESCRIPTION_LENGTH = 500;

/**
 * Модалка добавления нового питомца.
 * 
 * Поля:
 * - Кличка (обязательно)
 * - Вид животного
 * - Порода
 * - Дата рождения
 * - Пол
 * - Фото (опционально)
 * - Описание (опционально)
 */
export default function AddPetModal({ isOpen, onClose }) {
    const { addPet } = usePetContext();
    const fileInputRef = useRef(null);

    // Состояние формы
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('dog');
    const [breed, setBreed] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('unknown');
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // Валидация
    const canSubmit = name.trim().length > 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        const newPet = {
            id: Date.now().toString(), // Временный ID, позже заменится на серверный
            name: name.trim(),
            species,
            breed: breed.trim(),
            birthDate,
            gender,
            avatar: photo?.preview || null,
            description: description.trim(),
        };

        console.log('Добавление питомца:', newPet);
        // TODO: мутация через React Query

        // Временно добавляем в контекст
        addPet(newPet);

        // Сброс формы
        setName('');
        setSpecies('dog');
        setBreed('');
        setBirthDate('');
        setGender('unknown');
        setPhoto(null);
        setDescription('');
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
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) {
            console.warn('Можно загрузить только изображение');
            return;
        }
        setPhoto({
            file,
            preview: URL.createObjectURL(file),
        });
    };

    const removePhoto = () => {
        if (photo?.preview) {
            URL.revokeObjectURL(photo.preview);
        }
        setPhoto(null);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="medium">
            <form className={classes.form} onSubmit={handleSubmit}>
                {/* Заголовок */}
                <header className={classes.header}>
                    <h2 className={classes.title}>Добавить питомца</h2>
                    <p className={classes.subtitle}>
                        Заполните информацию о вашем питомце
                    </p>
                </header>

                {/* Кличка */}
                <div className={classes.field}>
                    <label htmlFor="pet-name" className={classes.label}>
                        Кличка <span className={classes.required}>*</span>
                    </label>
                    <input
                        id="pet-name"
                        type="text"
                        className={classes.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Например, Табурет"
                        required
                        maxLength={50}
                    />
                </div>

                {/* Вид животного */}
                <div className={classes.field}>
                    <label htmlFor="pet-species" className={classes.label}>
                        Вид животного
                    </label>
                    <select
                        id="pet-species"
                        className={classes.select}
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                    >
                        <option value="dog">Собака</option>
                        <option value="cat">Кошка</option>
                        <option value="bird">Птица</option>
                        <option value="fish">Рыба</option>
                        <option value="rodent">Грызун</option>
                        <option value="reptile">Рептилия</option>
                        <option value="other">Другое</option>
                    </select>
                </div>

                {/* Порода */}
                <div className={classes.field}>
                    <label htmlFor="pet-breed" className={classes.label}>
                        Порода
                    </label>
                    <input
                        id="pet-breed"
                        type="text"
                        className={classes.input}
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        placeholder="Например, Мейн-кун"
                        maxLength={100}
                    />
                </div>

                {/* Дата рождения */}
                <div className={classes.field}>
                    <label htmlFor="pet-birthdate" className={classes.label}>
                        Дата рождения
                    </label>
                    <input
                        id="pet-birthdate"
                        type="date"
                        className={classes.input}
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>

                {/* Пол */}
                <fieldset className={classes.genderFieldset}>
                    <legend className={classes.label}>Пол</legend>
                    <div className={classes.genderOptions}>
                        <label className={classes.radioLabel}>
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={gender === 'male'}
                                onChange={(e) => setGender(e.target.value)}
                                className={classes.radio}
                            />
                            <span>Мужской</span>
                        </label>
                        <label className={classes.radioLabel}>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={gender === 'female'}
                                onChange={(e) => setGender(e.target.value)}
                                className={classes.radio}
                            />
                            <span>Женский</span>
                        </label>
                        <label className={classes.radioLabel}>
                            <input
                                type="radio"
                                name="gender"
                                value="unknown"
                                checked={gender === 'unknown'}
                                onChange={(e) => setGender(e.target.value)}
                                className={classes.radio}
                            />
                            <span>Не указан</span>
                        </label>
                    </div>
                </fieldset>

                {/* Фото */}
                <div className={classes.field}>
                    <label className={classes.label}>Фото</label>
                    {photo ? (
                        <div className={classes.photoPreview}>
                            <img src={photo.preview} alt="Фото питомца" className={classes.photoThumb} />
                            <button
                                type="button"
                                className={classes.photoRemove}
                                onClick={removePhoto}
                                aria-label="Удалить фото"
                            >
                                <Icon icon={faTimes} />
                            </button>
                        </div>
                    ) : (
                        <div
                            className={clsx(classes.photoZone, {
                                [classes.photoZoneDragging]: isDragging,
                            })}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className={classes.fileInput}
                            />
                            <Icon icon={faImage} className={classes.photoIcon} />
                            <span className={classes.photoText}>
                                {isDragging
                                    ? 'Отпустите файл здесь'
                                    : 'Перетащите фото или нажмите для выбора'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Описание */}
                <div className={classes.field}>
                    <div className={classes.labelRow}>
                        <label htmlFor="pet-description" className={classes.label}>
                            Описание
                        </label>
                        <span
                            className={clsx(classes.charCount, {
                                [classes.charCountWarning]: description.length > MAX_DESCRIPTION_LENGTH * 0.9,
                            })}
                        >
                            {description.length} / {MAX_DESCRIPTION_LENGTH}
                        </span>
                    </div>
                    <textarea
                        id="pet-description"
                        className={classes.textarea}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Расскажите о характере, привычках..."
                        rows={3}
                        maxLength={MAX_DESCRIPTION_LENGTH}
                    />
                </div>

                {/* Футер */}
                <footer className={classes.footer}>
                    <Button type="button" variant="secondary" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button type="submit" variant="primary" disabled={!canSubmit}>
                        Добавить
                    </Button>
                </footer>
            </form>
        </Modal>
    );
}