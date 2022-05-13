/** @format */

module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        screens: {
            xs: '640px',
            sm: '768px',
            md: '1025px',
            lg: '1441px',
        },
        colors: {
            white: '#ffffff',
            black: '#000000',
            transparent: 'transparent',
            blue: {
                100: '#dcedfb',
                200: '#2165d2',
                300: '#223e5b',
                400: '#2164d2',
            },
            gray: {
                100: '#bebebe',
            },
        },
        fontFamily: {
            Source: ['Source Code Pro', 'monospace'],
        },
        extend: {
            fontSize: {
                '3xl': [
                    '28px',
                    {
                        lineHeight: '40px',
                    },
                ],
            },
            width: {
                28: '28rem',
            },
            backgroundImage: {
                'card-bg': "url('./assets/images/background-pink.jpeg')",
                'card-chip': 'url(./assets/images/chip.png)',
                'card-org-visa': 'url(./assets/images/visa.png)',
                'card-org-amex': 'url(./assets/images/amex.png)',
                'card-org-jcb': 'url(./assets/images/jcb.png)',
                'card-org-mastercard': 'url(./assets/images/mastercard.png)',
                'card-org-unpay': 'url(./assets/images/unpay.png)',
            },
            rotateY: {
                180: '180deg',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
