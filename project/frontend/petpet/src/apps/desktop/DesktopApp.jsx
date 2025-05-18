import classes from './DesktopApp.module.css'

import Header from './components/header/Header';
import SideMenu from './components/side_menu/SideMenu';
import MainBlock from './components/main/MainBlock';

import Profile from './pages/Pofile/Profile';
import YMap from './pages/YMap/YMap';
import InProcess from '../general/screens/in_process/InProcess';

import { Routes, Route } from 'react-router-dom';

export default function DesktopApp(){
    return (
        <div className={classes.desktop}>
            <Header/>
            <SideMenu menu_width="300" menu_height="626"/>
            <MainBlock>
                <Routes>
                    <Route path='/' element={<InProcess/>} />
                    <Route path='profile' element={<Profile/>} />
                    <Route path='ymap' element={<YMap/>} />
                </Routes>
            </MainBlock>
        </div>
    );
}