import App from '../App'
import NotFound from '@pages/not_found/NotFound'

import { createBrowserRouter } from 'react-router-dom';
import { routesConfig } from '@config/routesConfig';

const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <NotFound />,
        children: [
            // Все реальные маршруты
            ...routesConfig.map(({ path, element }) => ({ path, element })),
            // Ловец 404 - ВСЕГДА последним
            { path: '*', element: <NotFound /> },
        ],
    },
]);

export default router;