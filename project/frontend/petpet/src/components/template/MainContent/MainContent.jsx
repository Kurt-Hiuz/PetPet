import classes from './styles/MainContent.module.css';

import NotFound from '../../pages/not_found/NotFound';
import InProcess from '../../pages/in_process/InProcess';
import YMap from '../../pages/ymap/YMap';
import Store from '../../pages/store/Store';
import Profile from '../../pages/profile/Profile';

import { Routes, Route } from 'react-router-dom';

export default function MainContent(){
    return(
        <main className={classes.main_content_wrapper}>
            <Routes>
                <Route path='/not-found' element={<NotFound/>}/>
                <Route path='/' element={<InProcess/>} />
                <Route path='ymap' element={<YMap/>} />
                <Route path='store' element={<Store/>} />
                <Route path='profile' element={<Profile/>} />
                {/* 
                <Route path='store' element={<Store/>} /> */}
            </Routes>
        </main>
    );
}