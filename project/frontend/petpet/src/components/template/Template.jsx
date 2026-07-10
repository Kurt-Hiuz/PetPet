import classes from './styles/Template.module.css'

import { PetContextProvider } from '../../features/petContext/PetContextProvider';

import Header from './Header/Header'
import SideMenu from './SideBar/SideBar';
import MainContent from './MainContent/MainContent';
import ScrollToTop from '../ui/ScrollToTop/ScrollToTop';

import { useRef } from 'react';

export default function Template(){
    const scrollRef = useRef(null);

    return(
        <PetContextProvider>
            <div className={classes.template_wrapper}>
                <Header/>
                <div className={classes.template_content}>
                    <SideMenu/>
                    <MainContent/>
                </div>
                <ScrollToTop scrollContainerRef={scrollRef} threshold={400} />
            </div>
        </PetContextProvider>
    );
}