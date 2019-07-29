type Theme = import('styled-system').Theme

export const theme: Theme = {
  space: [0, 4, 8, 12, 16, 24, 32, 28, 64, 92, 128, 256, 512],
  sizes: [0, 4, 8, 12, 16, 24, 32, 28, 64, 92, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    blue: '#07c',
    blues: ['#004170', '#006fbe', '#2d8fd5', '#5aa7de'],
  },
  fonts: {
    sans: 'Noto Sans, Helvetica, Arial, sans-serif',
  },
}

export { Theme }
