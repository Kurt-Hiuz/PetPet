import testData from '../../../data/store_test_data.json';

import ProductCardGrid from '../../ui/ProductCardGrid/ProductCardGrid';
import StoreSearch from '../../../features/StoreSearch/StoreSearch';

export default function Store(){
    return(
        <>
            <StoreSearch/>
            <ProductCardGrid products={testData} isLoading={false}/>
        </>
    );
}