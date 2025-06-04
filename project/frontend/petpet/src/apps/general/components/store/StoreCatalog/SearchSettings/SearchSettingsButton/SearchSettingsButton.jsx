import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './styles/SearchSettingsButton.module.css';

export default function SearchSettingsButton({name, icon}){
    return(
        <button className={classes.search_setting_btn}>
            <FontAwesomeIcon icon={icon} />
            {name}
        </button>
    );
}