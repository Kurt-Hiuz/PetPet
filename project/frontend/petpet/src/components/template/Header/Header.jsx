import classes from './styles/Header.module.css'

import { ThemeSwitcher } from '@ui/ThemeSwitcher/ThemeSwitcher';

import CartButton from '@features/Cart/CartButton/CartButton';

export default function Header() {
    return(
        <header className={classes.header}>
            <ThemeSwitcher/>
            <CartButton/>
        </header>
    );
}