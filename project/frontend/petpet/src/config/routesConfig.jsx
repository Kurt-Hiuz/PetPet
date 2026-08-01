import inProcessRoute from '@routes/usingRoutes/inProcessRoute';

import profileRoute from '@routes/usingRoutes/profileRoute';
import storeRoute from '@routes/usingRoutes/storeRoute';
import ymapRoute from '@routes/usingRoutes/ymapRoute';
import newsRoute from '@routes/usingRoutes/newsRoute';

import productRoute from '@routes/usingRoutes/productRoute';

// Порядок в конфиге определяет положение внутри меню
export const routesConfig = [
    profileRoute,
    storeRoute,
    ymapRoute,
    newsRoute,
    ...inProcessRoute,
    productRoute,
];