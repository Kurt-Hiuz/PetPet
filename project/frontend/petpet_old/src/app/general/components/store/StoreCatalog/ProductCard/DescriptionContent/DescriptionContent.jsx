import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons';

import classes from './styles/DescriptionContent.module.css';

export default function DescriptionContent({description_data}){
    return(
        <div className={classes.description}>
            <span className={classes.cost}>{description_data.cost} ₽</span>
            <p>{description_data.text}</p>
            <div className={classes.rating}>
                <FontAwesomeIcon 
                    icon={faStar} 
                    className={classes.star}
                />
                {description_data.stars}
                <span>({description_data.review_count} отзывов)</span>
            </div>
        </div>
    );
}