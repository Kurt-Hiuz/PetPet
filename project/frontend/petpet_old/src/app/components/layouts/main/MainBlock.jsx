import classes from './styles/MainBlock.module.css'

export default function MainBlock({children}){
    return (
        <div className={classes.main_block}>
            {children}
        </div>
    );
}