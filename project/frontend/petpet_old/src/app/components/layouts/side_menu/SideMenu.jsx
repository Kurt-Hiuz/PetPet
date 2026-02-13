import classes from './styles/SideMenu.module.css'

import menu_items from './assets/menu_items.json' with { type: "json" };

import { Link } from 'react-router-dom';

export default function SideMenu({menu_width, menu_height}){
    return (
        <>
            <nav className={classes.nav_menu} style={{width: `${menu_width}px`, height: `${menu_height}px`}}>
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
        </>
    );
}