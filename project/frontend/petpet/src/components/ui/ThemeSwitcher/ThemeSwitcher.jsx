import { useState } from 'react';

import Button from '../Button/Button';

import { THEMES, THEME_CYCLE } from '../../../config/themes';

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('petpet-theme');
        return THEMES[saved] ? saved : 'light'; // Проверяем, существует ли тема
    });

    const toggleTheme = () => {
        const currentIndex = THEME_CYCLE.indexOf(theme);
        const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
        const newTheme = THEME_CYCLE[nextIndex];

        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('petpet-theme', newTheme);
    };

    return (
        <Button onClick={toggleTheme} variant="secondary" size="small">
            Тема: {THEMES[theme].name}
        </Button>
    );
};