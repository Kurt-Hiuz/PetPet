import { useState, useEffect } from 'react';
import { getPetDraftKey, DRAFT_UPDATED_EVENT } from '../constants/draftKeys';

/**
 * Проверяет, содержит ли черновик реальный контент.
 * Игнорирует пустые черновики ({caption: '', media: []}).
 */
function hasDraftContent(raw) {
    try {
        const draft = JSON.parse(raw);
        return (
            (typeof draft.caption === 'string' && draft.caption.trim().length > 0) ||
            (Array.isArray(draft.media) && draft.media.length > 0)
        );
    } catch {
        return false;
    }
}

/**
 * Извлекает petId из ключа черновика.
 * @param {string} key — ключ localStorage (например, 'draft:post:pet:123')
 * @returns {string|null}
 */
function extractPetId(key) {
    if (!key?.startsWith('draft:post:pet:')) return null;
    return key.replace('draft:post:pet:', '');
}

/**
 * Хук для проверки наличия черновиков в localStorage.
 *
 * Синхронизация:
 * - При монтировании — разовая проверка всех petIds
 * - Кастомное событие 'draft-updated' — для обновлений в ТЕКУЩЕЙ вкладке
 * - Storage event — для обновлений из ДРУГИХ вкладок
 *
 * @param {string[]} petIds — массив ID питомцев для проверки
 * @returns {Set<string>} — Set ID питомцев, у которых есть черновик
 */
export function useDraftStatus(petIds) {
    // Первоначальная проверка — при монтировании
    const [draftPetIds, setDraftPetIds] = useState(() => {
        const initial = new Set();
        for (const petId of petIds) {
            const raw = localStorage.getItem(getPetDraftKey(petId));
            if (raw && hasDraftContent(raw)) {
                initial.add(petId);
            }
        }
        return initial;
    });

    // Обновление при изменении списка питомцев
    useEffect(() => {
        const updated = new Set();
        for (const petId of petIds) {
            const raw = localStorage.getItem(getPetDraftKey(petId));
            if (raw && hasDraftContent(raw)) {
                updated.add(petId);
            }
        }
        setDraftPetIds(updated);
    }, [petIds]);

    // Подписка на обновления: кастомное событие + storage event
    useEffect(() => {
        // Обновление состояния по ключу
        const updateBykey = (key, hasDraft) => {
            const petId = extractPetId(key);
            if (!petId || !petIds.includes(petId)) return;
            
            setDraftPetIds((prev) => {
                const next = new Set(prev);
                if (hasDraft) {
                    next.add(petId);
                } else {
                    next.delete(petId);
                }
                return next;
            });
        };
        
        // Кастомное событие — для обновлений в ТЕКУЩЕЙ вкладке
        const handleCustomEvent = (e) => {
            updateBykey(e.detail.key, e.detail.hasDraft);
        };
        
        // Storage event — для обновлений из ДРУГИХ вкладок
        const handleStorage = (e) => {
            updateBykey(e.key, e.newValue !== null && hasDraftContent(e.newValue));
        };
        
        window.addEventListener(DRAFT_UPDATED_EVENT, handleCustomEvent);
        window.addEventListener('storage', handleStorage);
        return () => {
            window.removeEventListener(DRAFT_UPDATED_EVENT, handleCustomEvent);
            window.removeEventListener('storage', handleStorage);
        };
    }, [petIds]);

    return draftPetIds;
}