import Avatar from "./components/avatar/Avatar";
import MainInfoContainer from "./components/main_info_container/MainInfoContainer";
import SubAccountContainer from "./components/sub_account_container/SubAccountContainer";

import classes from './styles/ShortUserInfo.module.css'
import test_avatar from './test_assets/test_man.jpg'

export default function ShortUserInfo(){
    return (
        <main className={classes.short_user_info}>
            <Avatar user_avatar={test_avatar}/>
            <MainInfoContainer/>
            <SubAccountContainer/>
        </main>
    );
}