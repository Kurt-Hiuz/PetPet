import classes from './styles/StoreSearch.module.css';

import search_icon_path from './images/search_icon.svg'

export default function StoreSearch(){
    return(
        <div className={classes.search_container}>
            <input type="search" placeholder='Найти...'/>
            <img src={search_icon_path} alt="Иконка поиска" />
        </div>
    );
}