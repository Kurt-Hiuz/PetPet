import classes from './styles/MainContent.module.css';

import { Outlet } from 'react-router-dom';

export default function MainContent(){
    return(
        <main className={classes.main_content_wrapper}>
            <Outlet />
        </main>
    );
}