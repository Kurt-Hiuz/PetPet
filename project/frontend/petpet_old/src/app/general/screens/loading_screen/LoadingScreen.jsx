import LogoQuokka from '../../../assets/components/logo/LogoQuokka'

import classes from './styles/LoadingScreen.module.css'

export default function LoadingScreen(){
    return <div className={classes.loading_screen}>
        <LogoQuokka style={{width: '50vh'}}/>
        <h1 className={classes.logo_text}>PetPet</h1>
    </div>
}