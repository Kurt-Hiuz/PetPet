import classes from './Logo.module.css'
import logo from './assets/logo.png'

export default function Logo({text_logo}){
    return (
        <div className={classes.logo_container}>
            <img className={classes.logo_picture} src={logo} alt="petpet_logo" />
            <p>{text_logo}</p>
        </div>
    );
}