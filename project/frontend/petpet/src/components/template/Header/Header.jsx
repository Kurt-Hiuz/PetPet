import classes from './styles/Header.module.css'

import { ThemeSwitcher } from '../../ui/ThemeSwitcher/ThemeSwitcher';

export default function Header() {
    return(
        <header className={classes.header}>
            Шапка
            <ThemeSwitcher/>
        </header>
    );
}