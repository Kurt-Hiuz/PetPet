// Реестр рендереров для разных типов товаров
import SizeTable from './usingRenderers/SizeTable';
import FoodDetails from './usingRenderers/FoodDetails';

/**
 * Маппинг типа товара на компонент-рендерер.
 * Добавлять новые типы - просто добавить строку в этот объект.
 */
export const PRODUCT_DETAILS_RENDERERS = {
    clothing: SizeTable,
    food: FoodDetails,
    // medicine: MedicineDetails,  // В будущем
    // toys: ToysDetails,          // В будущем
};