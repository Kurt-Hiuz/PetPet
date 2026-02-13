import classes from './styles/Avatar.module.css'

export default function Avatar({user_avatar}){
    return (
        <div className={classes.avatar_frame}>
            <img className={classes.avatar} src={user_avatar} alt="Аватар пользователя"/>
        </div>
    );
}