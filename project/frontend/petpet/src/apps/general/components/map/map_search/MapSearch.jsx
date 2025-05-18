import classes from './styles/MapSearch.module.css';

import search_icon_path from './images/search_icon.svg'

export default function MapSearch(){
    return (
        <div className={classes.search_container}>
            <input type="text" placeholder='Найти...'/>
            <img src={search_icon_path} alt="Иконка поиска" />
        </div>
    );
}