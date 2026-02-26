import InProcess from '../components/pages/in_process/InProcess';
import YMap from '../components/pages/ymap/YMap';
import Store from '../components/pages/store/Store';
import Profile from '../components/pages/profile/Profile';

export const routesConfig = [
    {
        path: '/profile',
        element: <Profile />,
        name: 'Профиль',
        inMenu: true,
        icon: 'user',
    },
    {
        path: '/ymap',
        element: <YMap />,
        name: 'Карта',
        inMenu: true,
        icon: 'map',
    },
    {
        path: '/store',
        element: <Store />,
        name: 'Магазин',
        inMenu: true,
        icon: 'shopping',
    },
    {
        path: '/',
        element: <InProcess />,
        name: 'Лента',
        inMenu: true,
        icon: 'home',
    },
    {
        path: '/',
        element: <InProcess />,
        name: 'Скидочные карты',
        inMenu: true,
        icon: '',
    },
    {
        path: '/',
        element: <InProcess />,
        name: 'Благотворительность',
        inMenu: true,
        icon: '',
    },
    {
        path: '/',
        element: <InProcess />,
        name: 'Вопрос-ответ',
        inMenu: true,
        icon: '',
    },
    {
        path: '/',
        element: <InProcess />,
        name: 'Календарь',
        inMenu: true,
        icon: '',
    },
    {
        path: '/',
        element: <InProcess />,
        name: 'Документы',
        inMenu: true,
        icon: '',
    },
    {
        path: '/',
        element: <InProcess />,
        name: 'Статистика',
        inMenu: true,
        icon: '',
    },
    {
        path: '/',
        element: <InProcess />,
        name: 'Настройки',
        inMenu: true,
        icon: '',
    },
];