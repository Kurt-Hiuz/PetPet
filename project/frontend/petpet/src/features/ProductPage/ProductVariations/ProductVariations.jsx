import { useEffect, useCallback } from 'react';

import clsx from 'clsx';
import classes from './styles/ProductVariations.module.css';

import { useProductVariationsStore } from '@shared/store/productVariationsStore';
import { useSearchParams } from 'react-router-dom';

import Button from '@ui/Button/Button';

import { formatNumber } from '@utils/formatNumber';

export default function ProductVariations({ productId, variations, initialVariationId }) {
    const [, setSearchParams] = useSearchParams();
    
    const storeVariationId = useProductVariationsStore(
        state => state.variations[productId]
    );
    const setVariation = useProductVariationsStore(state => state.setVariation);
    
    const currentId = initialVariationId 
        || storeVariationId 
        || variations.find(v => v.inStock)?.id;
    
    useEffect(() => {
        if (initialVariationId && initialVariationId !== storeVariationId) {
            setVariation(productId, initialVariationId);
        }
    }, [initialVariationId, productId, storeVariationId, setVariation]);
    
    const handleSelect = useCallback((variationId) => {
        setVariation(productId, variationId);
        setSearchParams({ variation: variationId }, { replace: true });
    }, [productId, setVariation, setSearchParams]);
    
    return (
        <div className={classes.variations}>
            <h3 className={classes.title}>Выберите вариант:</h3>
            <div className={classes.options}>
                {variations.map((v) => (
                    <Button
                        key={v.id}
                        variant="secondary"
                        disabled={!v.inStock}
                        classList={clsx(
                            classes.option,
                            currentId === v.id && classes.option_selected,
                            !v.inStock && classes.option_disabled
                        )}
                        OnClick={() => handleSelect(v.id)}
                        ariaLabel={`${v.label}${!v.inStock ? ', нет в наличии' : ''}`}
                        aria-pressed={currentId === v.id}
                    >
                        <span className={classes.option_label}>{v.label}</span>
                        <span className={classes.option_price}>{formatNumber(v.price)} ₽</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}