const path = require('path');

module.exports = {
  style: {
    postcss: {
      mode: 'extend',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          config: true,
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};