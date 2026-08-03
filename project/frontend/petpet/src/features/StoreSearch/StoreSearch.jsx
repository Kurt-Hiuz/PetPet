import classes from './styles/StoreSearch.module.css';

import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '@shared/store/favoritesStore';

import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';
import Input from '@ui/Input/Input';

import { faArrowsUpDown, faFilter, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function StoreSearch(){
    const navigate = useNavigate();
    const favoritesCount = useFavoritesStore(state => state.favoriteIds.length);
    
    return(
        <div className={classes.search_wrapper}>
            <Input 
                placeholder="Поиск товара..." 
                icon={faSearch} 
                iconPosition='right'
                ariaLabel='Поиск товара'
            />

            <div className={classes.buttons}>
                <Button 
                    variant='secondary' 
                    ariaLabel="Сортировка по популярности"
                    OnClick={() => console.log('TEST: sort clicked')}
                >
                    <Icon icon={faArrowsUpDown}/>
                    По популярности
                </Button>
                <Button 
                    variant='secondary' 
                    ariaLabel="Фильтр товаров"
                    OnClick={() => console.log('TEST: filter clicked')}
                >
                    <Icon icon={faFilter}/>
                </Button>
                <Button 
                    variant='secondary' 
                    ariaLabel="Избранное"
                    OnClick={() => navigate('/favorites')}
                >
                    <Icon icon={faHeart}/>
                    {favoritesCount > 0 && <span className={classes.badge}>{favoritesCount}</span>} 
                </Button>
            </div>
        </div>
    );
}