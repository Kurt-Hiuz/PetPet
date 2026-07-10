import { useState, useEffect } from 'react';
import { getFeed } from '../../../shared/api/post/postApi';

/**
 * Хук для загрузки ленты постов
 * 
 * @param {Object} options
 * @param {string} [options.petId] - ID питомца для фильтрации
 * @param {number} [options.limit=10] - количество постов
 * @param {number} [options.offset=0] - сдвиг для пагинации
 * @returns {{
 *   posts: Array,
 *   loading: boolean,
 *   error: string | null,
 *   refetch: () => Promise<void>
 * }}
 */
export const useFeed = ({ petId, limit = 10, offset = 0 } = {}) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Загрузка ленты
    const load = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getFeed({ limit, offset, petId });
            setPosts(data);
        } catch (err) {
            if (err.message === 'NO_MORE_DATA') {
                // Это не ошибка, просто нет больше постов
                setPosts([]);
            } else {
                setError(`Не удалось загрузить ленту. Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    // Загрузка при монтировании и при смене petId/limit/offset
    useEffect(() => {
        load();
    }, [petId, limit, offset]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        posts,
        loading,
        error,
        refetch: load, // Возможность повторной загрузки
    };
};