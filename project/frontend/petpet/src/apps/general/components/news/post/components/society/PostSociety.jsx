import classes from './styles/PostSociety.module.css'

import heart_icon from './images/heart_icon.svg'

export default function PostSociety({society_data}){
    return (
        <div className={classes.society_container}>
            <div className={classes.reactions}>
                <section>
                    <img src={heart_icon} alt="Сердечко"/>
                    {society_data.likes}
                </section>
            </div>
            <p>{society_data.comments} комментариев</p>
        </div>
    );
}