import classes from './styles/MapHotButtons.module.css'

export default function MapHotButtons(){
    return(
        <div className={classes.map_hot_buttons}>
            <button className={classes.buttons}>Магазины</button>
            <button className={classes.buttons}>Вет-клиники</button>
            <button className={classes.buttons}>Парки</button>
        </div>
    );
}