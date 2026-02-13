import classes from './styles/PostMain.module.css'

export default function PostMain({main_data}){

    const imagePath = new URL(`./images/${main_data.content}`, import.meta.url).href;

    return (
        <div className={classes.main_content}>
            <img src={imagePath} alt="Контент" />
            {main_data.title ? <p>{main_data.title}</p> : null}
        </div>
    );
}