
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Cores personalizadas para a Rádio Trem AI
				'radio-purple': '#8B5CF6',
				'radio-pink': '#EC4899',
				'radio-blue': '#3B82F6',
				'radio-cyan': '#06B6D4',
				'radio-green': '#10B981',
				'radio-dark': '#0F0F0F',
				'radio-darker': '#0A0A0A',
				brand: {
					ink: '#F8FAFC',
					muted: '#94A3B8',
					surface: '#101827',
					'elevated': '#172033',
					glass: 'rgba(255, 255, 255, 0.06)',
					line: 'rgba(255, 255, 255, 0.12)',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'brand-lg': '1rem',
				'brand-xl': '1.5rem',
				'brand-full': '999px',
			},
			boxShadow: {
				'brand-soft': '0 18px 50px rgba(2, 6, 23, 0.28)',
				'brand-panel': '0 24px 80px rgba(2, 6, 23, 0.42)',
				'brand-glow': '0 24px 90px rgba(139, 92, 246, 0.22)',
				'brand-live': '0 0 24px rgba(239, 68, 68, 0.24)',
			},
			backdropBlur: {
				brand: '18px',
			},
			transitionTimingFunction: {
				brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)'
					}
				},
				'wave': {
					'0%, 100%': { transform: 'scaleY(1)' },
					'50%': { transform: 'scaleY(2)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'brand-fade-up': {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'gradient-x': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'wave': 'wave 1s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'gradient-x': 'gradient-x 3s ease infinite',
				'brand-fade-up': 'brand-fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both'
			},
			transitionProperty: {
				brand: 'color, background-color, border-color, box-shadow, opacity, transform',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'brand-hero': 'linear-gradient(135deg, rgba(139, 92, 246, 0.20), rgba(6, 182, 212, 0.12) 48%, rgba(15, 23, 42, 0.72))',
				'brand-glass': 'linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.035))',
				'brand-cta': 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
