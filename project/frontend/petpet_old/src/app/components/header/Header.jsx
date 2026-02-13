import Logo from './components/logo/Logo'
import UserAvatar from './components/user_avatar/UserAvatar'

import classes from './styles/Header.module.css'
import test_user_avatar from './test_assets/test_man.jpg'

export default function Header(){
    return(
        <>
            <header className={classes.header}>
                <Logo text_logo="PetPet"/>
                <UserAvatar user_avatar={test_user_avatar}/>
            </header>
        </>
    );
}