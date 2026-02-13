import classes from './styles/ProductCardImage.module.css';

import Icon from '../../Icon/Icon';

import {faHeart} from '@fortawesome/free-solid-svg-icons';

export default function ProductCardImage({imagePath}){
    return(
        <div className={classes.img_wrapper}>
            <Icon icon={faHeart} color="black"/>
            <img src={imagePath} alt="Картинка товара" />
        </div>
    );
}