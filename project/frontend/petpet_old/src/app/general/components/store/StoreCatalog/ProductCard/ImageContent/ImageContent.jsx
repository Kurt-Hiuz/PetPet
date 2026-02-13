import LikeIcon from './LikeIcon/LikeIcon';

import classes from './styles/ImageContent.module.css';

export default function ImageContent({image_path}){

    const imagePath = new URL(image_path, import.meta.url).href;

    return(
        <div className={classes.image_container}>
            <LikeIcon/>
            <img 
                src={imagePath} 
                alt="Картинка товара"
                className={classes.product_image}
            />
        </div>
    );
}