/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto-fit': 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            },
            // screens: {
            //     defaultult: 'var(--screen-default)',
            //     sm: 'var(--screen-sm)',
            //     md: 'var(--screen-md)',
            //     lg: 'var(--screen-lg)',
            //     xl: 'var(--screen-xl)',
            //     '2xl': 'var(--screen-2xl)',
            //     '3xl': 'var(--screen-3xl)',
            //     '4xl': 'var(--screen-4xl)',
            // },
            // fontSize: {
            //     'base-100': 'var(--base-100)',
            //     'base-200': 'var(--base-200)',
            //     'base-300': 'var(--base-300)',
            //     'base-content': 'var(--base-content)',
            // },
            // fluid: ({ theme }) => ({
            //     'screen-default': theme('screens.defaultult'),
            //     'screen-sm': theme('screens.sm'),
            //     'screen-md': theme('screens.md'),
            //     'screen-lg': theme('screens.lg'),
            //     'screen-xl': theme('screens.xl'),
            //     'screen-2xl': theme('screens.2xl'),
            //     'screen-3xl': theme('screens.3xl'),
            //     'screen-4xl': theme('screens.4xl'),
            //     'base-100': theme('fontSize.base-100'),
            //     'base-200': theme('fontSize.base-200'),
            //     'base-300': theme('fontSize.base-300'),
            //     'base-content': theme('fontSize.base-content'),
            // }),
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                secondary: 'var(--secondary)',
                accent: 'var(--accent)',
                neutral: 'var(--neutral)',
                'base-100': 'var(--base-100)',
                'base-200': 'var(--base-200)',
                'base-300': 'var(--base-300)',
                'base-content': 'var(--base-content)',
                primary: '#fdc112',
                body: '#ECEEFF',
            },
            animation: {
                'drop-marker': 'drop 0.6s ease-out forwards',
                popout: 'popout 0.5s ease-out forwards',
            },
            keyframes: {
                drop: {
                    '0%': { transform: 'translateY(-200px)', opacity: '0' },
                    '70%': { transform: 'translateY(10px)', opacity: '1' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                popout: {
                    '0%': { transform: 'scale(0)', opacity: '0' },
                    '50%': { transform: 'scale(1.2)', opacity: '0.5' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
};
