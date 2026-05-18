import { useState, useEffect, useCallback } from 'react';
import { getFeed } from '../services/postService';

export const useFeed = (options = {}) => {
    const { limit = 10, offset = 0 } = options;
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    const loadFeed = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getFeed({ limit, offset });
            setPosts(prev => offset === 0 ? data : [...prev, ...data]);
            setHasMore(data.length === limit); // Если вернули меньше чем limit → больше нет
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [limit, offset]);

    useEffect(() => {
        loadFeed();
    }, [loadFeed]);

    return { posts, loading, error, hasMore, reload: loadFeed };
};