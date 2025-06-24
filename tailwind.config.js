/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				navy: {
					900: '#001f3f',
				},
				orange: {
					500: '#de7a37',
				},
				'navy-900': '#0a1f44',
				'navy-800': '#0b2a5b',
			},
			animation: {
				'slide-in-left': 'slideInLeft 1s ease-out',
				'slide-in-right': 'slideInRight 1s ease-out',
			},
			keyframes: {
				slideInLeft: {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				slideInRight: {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
			},
		},
	},
	plugins: [],
};
