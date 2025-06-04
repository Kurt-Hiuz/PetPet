import SearchSettingsButton from './SearchSettingsButton/SearchSettingsButton';

import { faFilter, faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';

import classes from './styles/SearchSettings.module.css'

export default function SearchSettings(){
    return(
        <section className={classes.search_settings}>
            <SearchSettingsButton name="По популярности" icon={faArrowsUpDown}/>
            <SearchSettingsButton name="Фильтры" icon={faFilter}/>
        </section>
    );
}