import classes from './styles/InProcess.module.css'

import LogoQuokka from '../../../../assets/components/logo/LogoQuokka'

import paws_top_right_path from './images/top_right_paws.svg'
import bottom_left_paws_path from './images/bottom_left_paws.svg'
import bottom_right_hearts_path from './images/bottom_right_hearts.svg'
import top_left_hearts_path from './images/top_left_hearts.svg'

export default function InProcess(){
    return (
        <div className={classes.in_process_container}>
            <img className={classes.top_right_paws} src={paws_top_right_path} alt="Лапки" />
            <img className={classes.bottom_left_paws} src={bottom_left_paws_path} alt="Лапки" />
            <img className={classes.bottom_right_hearts} src={bottom_right_hearts_path} alt="Декорации" />
            <img className={classes.top_left_hearts} src={top_left_hearts_path} alt="Декорации" />
            <main>
                <LogoQuokka style={{width: '50vh'}}/>
                <span className={classes.text}>
                    <h1 className={classes.title}>Мы готовимся!</h1>
                    <p className={classes.sub_title}>скоро этот сервис будет доступен</p>
                </span>
            </main>
        </div>
    );
}