// tailwind.config.js
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			dark: {
  				default: '#0a0f1c',
  				light: '#1a2233',
  				softer: '#2a3245'
  			},
  			logoBlue: '#4555e3',
  			neon: {
  				blue: '#00f0ff',
  				purple: '#a855f7',
  				green: '#00ff9d',
  				pink: '#ff00aa'
  			},
  			text: {
  				base: '#e4e6eb',
  				muted: '#9ca3af',
  				heading: '#ffffff'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'tech-gradient': 'linear-gradient(135deg, #0a0f1c 0%, #1a2233 50%, #2a3245 100%)',
  			'neon-glow': 'radial-gradient(circle at 50% 50%, rgba(0,240,255,0.25), transparent 70%)'
  		},
  		translate: {
  			'101': '101%'
  		},
  		keyframes: {
  			marquee: {
  				from: {
  					transform: 'translateX(0%)'
  				},
  				to: {
  					transform: 'translateX(-50%)'
  				}
  			}
  		},
  		animation: {
  			marquee: 'marquee 15s linear infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
