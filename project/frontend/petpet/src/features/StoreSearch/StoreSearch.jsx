import classes from './styles/StoreSearch.module.css';

import Button from '@ui/Button/Button';
import Icon from '@ui/Icon/Icon';
import Input from '@ui/Input/Input';

import { faArrowsUpDown, faFilter, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function StoreSearch(){
    return(
        <div className={classes.search_wrapper}>
            <Input placeholder="Поиск товара..." icon={faSearch} iconPosition='right'/>

            <div className={classes.buttons}>
                <Button variant='secondary' ariaLabel="Сортировка по популярности">
                    <Icon icon={faArrowsUpDown}/>
                    По популярности
                </Button>
                <Button variant='secondary' ariaLabel="Фильтр товаров">
                    <Icon icon={faFilter}/>
                </Button>
                <Button variant='secondary' ariaLabel="Избранное">
                    <Icon icon={faHeart}/>
                </Button>
            </div>
        </div>
    );
}