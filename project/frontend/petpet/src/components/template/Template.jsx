import Header from './Header/Header'
import SideMenu from './SideBar/SideBar';
import MainContent from './MainContent/MainContent';

import classes from './styles/Template.module.css'

export default function Template(){
    return(
        <div className={classes.template_wrapper}>
            <Header/>
            <div className={classes.template_content}>
                <SideMenu/>
                <MainContent/>
            </div>
        </div>
    );
}