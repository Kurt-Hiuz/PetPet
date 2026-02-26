import classes from './styles/SideBar.module.css'

import { routesConfig } from '../../../config/routesConfig';

import { Link } from 'react-router-dom';

export default function SideMenu(){
    const menu_items = routesConfig.filter(item => item.inMenu);

    return (
        <nav className={classes.nav_menu}>
            <div className={classes.nav_ul}>
                {menu_items.map((menu_item) => (
                    <Link
                        to={menu_item.path || '/not-found'} 
                        className={classes.nav_li} 
                        key={menu_item.path}
                    >
                        {/* <Icon icon={menu_item.icon} /> */}
                        {menu_item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}