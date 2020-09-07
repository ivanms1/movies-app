const withImages = require('next-images');

module.exports = withImages({
  env: {
    imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
    imageBackdropBaseUrl: 'https://image.tmdb.org/t/p/original',
    fetchBaseUrl: 'https://api.themoviedb.org/3',
    apiKey: process.env.API_KEY,
  },
  esModule: true,
  webpack(config, options) {
    return config;
  },
  generateBuildId: async () => {
    if (process.env.BUILD_ID) {
      return process.env.BUILD_ID;
    } else {
      return `${new Date().getTime()}`;
    }
  },
});
