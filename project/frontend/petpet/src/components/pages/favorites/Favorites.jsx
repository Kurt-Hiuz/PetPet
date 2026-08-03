import { useFavoritesStore } from '@shared/store/favoritesStore';

import ProductCardGrid from '@ui/ProductCardGrid/ProductCardGrid';

import classes from './styles/Favorites.module.css';

export default function Favorites() {
    // Селектор возвращает стабильные данные (массив ID и объект кэша)
    const favoriteIds = useFavoritesStore(state => state.favoriteIds);
    const cachedProducts = useFavoritesStore(state => state.cachedProducts);
    
    // Вычисляем результат ВНЕ селектора - это обычная переменная
    const favoriteProducts = favoriteIds
        .map(id => cachedProducts[id])
        .filter(Boolean);
    
    if (favoriteProducts.length === 0) {
        return (
            <div className={classes.empty_state}>
                <h2>В избранном пока пусто</h2>
                <p>Добавляйте товары, нажимая на сердечко</p>
            </div>
        );
    }
    
    return (
        <div className={classes.favorites_page}>
            <h1>Избранное</h1>
            <ProductCardGrid products={favoriteProducts} isLoading={false} />
        </div>
    );
}