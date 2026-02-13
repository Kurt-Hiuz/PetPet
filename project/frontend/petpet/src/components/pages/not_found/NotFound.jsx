import classes from './styles/NotFound.module.css';

export default function NotFound(){
    return(
        <div className={classes.not_found}>
            Ошибка: путь не указан в файле данных. <br/>
            Проверьте данные внутри файла данных навигации по проекту
        </div>
    );
}