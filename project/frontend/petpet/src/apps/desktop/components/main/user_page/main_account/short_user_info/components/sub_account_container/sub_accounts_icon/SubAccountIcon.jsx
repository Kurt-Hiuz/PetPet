import classes from './styles/SubAccountIcon.module.css'

export default function SubAccountIcon({img_path}){
    if(img_path.includes('+')){
        return <>
            <div className={classes.icon_frame}>
                +
            </div>
        </>
    }

    return <>
        <div className={classes.icon_frame}>
            <img className={classes.icon_image} src={img_path} alt="Иконка питомца" />
        </div>
    </>
}