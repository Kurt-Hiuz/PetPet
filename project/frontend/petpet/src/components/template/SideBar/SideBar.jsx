import classes from './styles/SideBar.module.css'

import menu_items from '../../../data/menu_items.json' with { type: "json" };

import { Link } from 'react-router-dom';

export default function SideMenu(){
    return (
        <nav className={classes.nav_menu}>
            <div className={classes.nav_ul}>
                {menu_items.map((list_item) => (
                    <Link
                        to={list_item.page_path || '/not-found'} 
                        className={classes.nav_li} 
                        key={list_item.name}
                    >
                        {list_item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}