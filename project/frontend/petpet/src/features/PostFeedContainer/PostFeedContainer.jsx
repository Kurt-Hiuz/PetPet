import { useState, useEffect } from 'react';
import { getFeed } from '../../services/postService';
import PostFeed from '../../components/ui/PostFeed/PostFeed';

export default function PostFeedContainer() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getFeed({ limit: 10, offset: 0 });
                setPosts(data);
            } catch (err) {
                setError(`Не удалось загрузить ленту. Error: ${err}`);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
    return <PostFeed posts={posts} />;
}