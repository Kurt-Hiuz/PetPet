import classes from './styles/StoreSearch.module.css';

import Button from '../../components/ui/Button/Button';
import Icon from '../../components/ui/Icon/Icon';
import Input from '../../components/ui/Input/Input';

import { faArrowsUpDown, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function StoreSearch(){
    return(
        <div className={classes.search_wrapper}>
            <Input placeholder="Поиск товара..." icon={faSearch} iconPosition='right'/>

            <div className={classes.buttons}>
                <Button variant='secondary'>
                    <Icon icon={faArrowsUpDown}/>
                    По популярности
                </Button>
                <Button variant='secondary'>
                    <Icon icon={faFilter}/>
                    Фильтры
                </Button>
            </div>
        </div>
    );
}