import { useCallback } from 'react';

import clsx from 'clsx';
import classes from './styles/ProductVariations.module.css';

import { useProductVariationsStore } from '@shared/store/productVariationsStore';

export default function ProductVariations({ productId, variations }) {
    const selectedId = useProductVariationsStore(
        state => state.variations[productId]
    );
    const setVariation = useProductVariationsStore(state => state.setVariation);
    
    const currentId = selectedId || variations.find(v => v.inStock)?.id;
    
    const handleSelect = useCallback((variationId) => {
        setVariation(productId, variationId);
    }, [productId, setVariation]);
    
    return (
        <div className={classes.variations}>
            <h3 className={classes.title}>Выберите вариант:</h3>
            <div className={classes.options}>
                {variations.map((v) => (
                    <button
                        key={v.id}
                        type="button"
                        disabled={!v.inStock}
                        className={clsx(
                            classes.option,
                            currentId === v.id && classes.option_selected,
                            !v.inStock && classes.option_disabled
                        )}
                        onClick={() => handleSelect(v.id)}
                        aria-pressed={currentId === v.id}
                        aria-label={`${v.label}${!v.inStock ? ', нет в наличии' : ''}`}
                    >
                        <span className={classes.option_label}>{v.label}</span>
                        <span className={classes.option_price}>{v.price} ₽</span>
                    </button>
                ))}
            </div>
        </div>
    );
}