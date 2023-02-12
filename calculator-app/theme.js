const themeKey = 'theme-preference';
const theme = {
    DARK: {
        name: 'Dark',
        value: '1'
    },
    LIGHT: {
        name: 'Light',
        value: '2'
    },
    PURPLE: {
        name: 'Purple',
        value: '3'
    }
};
const themeValue = {
    '1': theme.DARK,
    '2': theme.LIGHT,
    '3': theme.PURPLE
};

let $themeToggleButton;
let curTheme;

function getColorPreference() {
    const themePreference = localStorage.getItem(themeKey);
    if (typeof themePreference === 'string' && themeValue[themePreference])
        return themeValue[themePreference];
        
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? theme.DARK
        : theme.LIGHT;
}

curTheme = getColorPreference();

function reflectPreference() {
    document.firstElementChild.dataset.theme = curTheme.value;
    $themeToggleButton?.setAttribute('aria-label', curTheme.name);
}

reflectPreference();

function setPreference() {
    localStorage.setItem(themeKey, curTheme.value);
    reflectPreference();
}

function onThemeChange() {
    let theme = curTheme ? curTheme.value : '1';
    theme = parseInt(theme) % 3 + 1;
    curTheme = themeValue[theme];
    setPreference();
}

window.onload = () => {
    curTheme = getColorPreference();
    $themeToggleButton = document.getElementById('theme-toggle-button');
    reflectPreference();
    $themeToggleButton.addEventListener('click', onThemeChange);
}

window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches:isDark }) => {
        curTheme = isDark ? theme.DARK : theme.LIGHT;
        setPreference();
    });