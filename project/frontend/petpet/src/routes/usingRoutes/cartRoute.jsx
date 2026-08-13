import Cart from '@pages/cart/Cart';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default {
    path: '/cart',
    element: <Cart />,
    name: 'Корзина',
    inMenu: true,
    icon: faShoppingCart,
};