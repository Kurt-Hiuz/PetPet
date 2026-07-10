import PostFeed from '../../components/ui/PostFeed/PostFeed';
import { useFeed } from './hooks/useFeed';
import { usePetContext } from '../../components/shared/hooks/usePetContext';

/**
 * Контейнер для ленты постов
 * Получает activePetId из контекста и передаёт в useFeed
 */
export default function PostFeedContainer() {
    // Получаем activePetId из контекста
    const { activePetId, currentPet, isLoading: isPetLoading } = usePetContext();

    // Передаём в useFeed - он автоматически перезагрузит ленту при смене petId
    const { posts, loading, error, refetch } = useFeed({ petId: activePetId });
    
    // Пока загружается список питомцев - показываем загрузку
    if (isPetLoading) {
        return <div>Загрузка питомцев...</div>;
    }

    // Пока загружается лента - показываем загрузку
    if (loading) {
        return <div>Загрузка ленты...</div>;
    }

    // Если ошибка - показываем ошибку с кнопкой повторить
    if (error) {
        return (
            <div>
                <div>Ошибка: {error}</div>
                <button onClick={refetch}>Повторить</button>
            </div>
        );
    }

    // Формируем заголовок режима
    const feedTitle = activePetId && currentPet
        ? `Лента питомца ${currentPet.name}`
        : 'Общая лента';

    return(
        <>
            <h2>{feedTitle}</h2>
            <PostFeed posts={posts} />
        </>
    );
}