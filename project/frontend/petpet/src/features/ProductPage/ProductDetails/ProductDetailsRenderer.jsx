import { PRODUCT_DETAILS_RENDERERS } from './renderers';

/**
 * Динамический рендеринг специфичных блоков товара.
 * Работает по аналогии с PostMedia - через реестр, а не if/else.
 * 
 * @param {Object} props
 * @param {string} props.type - Тип товара (ключ в PRODUCT_DETAILS_RENDERERS)
 * @param {Object} props.data - Данные для рендерера
 */
export default function ProductDetailsRenderer({ type, data }) {
    const Renderer = PRODUCT_DETAILS_RENDERERS[type];
    
    if (!Renderer) {
        // Для неизвестных типов - ничего не рендерим
        // Можно добавить fallback-рендерер в будущем
        return null;
    }
    
    return (
        <section className="product-details-section">
            <h2>Подробности о товаре</h2>
            <Renderer data={data} />
        </section>
    );
}