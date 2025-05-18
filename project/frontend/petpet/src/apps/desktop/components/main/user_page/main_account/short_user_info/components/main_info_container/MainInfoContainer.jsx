import classes from "./styles/MainInfoContainer.module.css"

export default function MainInfoContainer(){
    return (
        <div className={classes.main_info_container}>
            <div className={classes.text_block}>
                <h2 className={classes.user_name}>His Majesty</h2>
                <div className={classes.user_description}>Мамочка трёх ангелочков Меня сложно найти, легко потерять и невозможно забыть Великолепнейший мужчина этого мира</div>
            </div>
        </div>
    );
}