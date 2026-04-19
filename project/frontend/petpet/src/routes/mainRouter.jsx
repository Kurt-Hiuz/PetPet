import App from '../App'
import NotFound from '../components/pages/not_found/NotFound'

import { createBrowserRouter } from 'react-router-dom';
import { routesConfig } from '../config/routesConfig';

const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <NotFound />,
        children: routesConfig.map(({ path, element }) => ({ path, element })),
    },
]);

export default router;