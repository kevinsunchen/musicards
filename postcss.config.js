const purgecss = require('@fullhuman/postcss-purgecss')({
    content: ['./client/src/**/*.js', './client/src/**/*.jsx', './client/public/**/*.html'],
    defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  });
  
  module.exports = {
    plugins: [
      require('tailwindcss'),
      ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
    ],
  };