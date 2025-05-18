import classes from './styles/ErrorScreen.module.css'

import errors from './assets/http_codes.json' with { type: "json" };

import tiger_paws from './assets/paws_svg/tiger.svg';
import tiger_paws_2 from './assets/paws_svg/tiger_2.svg';
import tiger_paws_3 from './assets/paws_svg/tiger_3.svg';
import seagull_paws from './assets/paws_svg/seagull.svg';
import seagull_paws_2 from './assets/paws_svg/seagull_2.svg';
import pig_paws from './assets/paws_svg/pig.svg';
import pig_paws_2 from './assets/paws_svg/pig_2.svg';

export default function ErrorScreen({error_code}){

    const error = errors.find(err => err.code === error_code) || {
        code: 'Неизвестная ошибка',
        name: 'Ошибка',
        description: 'Информация об ошибке не найдена.',
    };

    return <>
        <img style={{left: '5px', top: '161px'}} className={classes.seagull_paws} src={seagull_paws} alt="Лапки чайки" />
        <img style={{left: '206px', top: '-30px'}} className={classes.seagull_paws} src={seagull_paws_2} alt="Лапки чайки" />
        <img style={{right: '10px', top: '250px'}} className={classes.pig_paws} src={pig_paws} alt="Лапки свинки" />
        <img style={{right: '220px', top: '0px'}} className={classes.pig_paws} src={pig_paws_2} alt="Лапки свинки" />
        <img style={{left: '323px', bottom: '-25px'}} className={classes.tiger_paws} src={tiger_paws} alt="Лапки тигра" />
        <img style={{left: '698px', bottom: '152px'}} className={classes.tiger_paws} src={tiger_paws_2} alt="Лапки тигра" />
        <img style={{left: '1226px', bottom: '135px'}} className={classes.tiger_paws} src={tiger_paws_3} alt="Лапки тигра" />
        <div className={classes.error_wrapper}>
            <main className={classes.code_part}>
                <p>{error_code}</p>
            </main>
            <section className={classes.description_part}>
                <h1>{error.name}</h1>
                <p>{error.description}</p>
            </section>
        </div>
    </>
}