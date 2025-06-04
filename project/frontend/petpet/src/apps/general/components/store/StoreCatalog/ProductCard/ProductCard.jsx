import ImageContent from './ImageContent/ImageContent';
import DescriptionContent from './DescriptionContent/DescriptionContent';
import ToCartButton from './ToCartButton/ToCartButton';

import classes from './styles/ProductCard.module.css';


export default function ProductCard({card_data}){
    return(
        <section className={classes.card_box}>
            <div className={classes.main_content}>
                <ImageContent 
                    image_path={card_data.product_img_path} 
                />
                <DescriptionContent 
                    description_data={card_data.product_description}
                />
            </div>
            <ToCartButton/>
        </section>
    );
}