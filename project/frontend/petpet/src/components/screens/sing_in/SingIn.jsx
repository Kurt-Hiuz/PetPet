import FunnyFace from '../../../assets/components/logo/FunnyFace'

import classes from './styles/SingIn.module.css'

export default function SingIn(){

    const noRegistrationLabel = 'Ещё не зарегистрированы? Регистрация';
    const alreadyRegistrationLabel = 'Уже зарегистрированы? Авторизация';

    const isReg = true;

    const authorization = <><input type='text' placeholder='Пароль'></input><br/></>;

    const registration = <>
                            <input type='email' placeholder='Почта'></input><br/>
                            <input type='password' placeholder='Пароль'></input><br/>
                            <input type='password' placeholder='Повторите пароль'></input><br/>
                            <div className={classes.ckeckbox_container}><input type='checkbox'></input>даю согласие на обработку персональных данных</div>
                        </>;

    return <div className={classes.sign_in_container}>
        <FunnyFace style={{width: '400px'}} className={classes.funny_logo} />
        <form action="" className={classes.form}>
            <h1 className={classes.title}>{isReg ? 'Авторизация' : 'Регистрация'}</h1>
            <input type="text" placeholder='Логин'/><br/>
            {isReg ? authorization : registration}
            <button className={classes.submit_btn} type="submit">{isReg ? 'Вход' : 'Регистрация'}</button>
        </form>
        <p className={classes.hint}>{isReg ? noRegistrationLabel : alreadyRegistrationLabel}</p>
    </div>
}