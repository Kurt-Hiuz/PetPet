import classes from './UserAvatar.module.css'

export default function UserAvatar({user_avatar}){
    return (
        <div style={{marginRight: "180px"}} className={classes.user_avatar_wrapper}>
            <img  className={classes.user_avatar} src={user_avatar} alt="User avatar"/>
        </div>
    );
}