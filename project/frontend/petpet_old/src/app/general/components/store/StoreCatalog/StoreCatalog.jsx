import SearchSettings from './SearchSettings/SearchSettings';
import ProductCard from './ProductCard/ProductCard';

import classes from './styles/StoreCatalog.module.css'

import products_data from './ProductCard/test_data/store_test_data.json' with { type: "json" };

export default function StoreCatalog(){
    return(
        <div className={classes.store_catalog}>
            <SearchSettings/>
            <div className={classes.cards_holder}>
                {products_data.map((current_product_data) => (
                    <ProductCard 
                        card_data={current_product_data}
                        key={current_product_data.product_img_path}
                    />
                ))}
            </div>
        </div>
    );
}