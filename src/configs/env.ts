const packageJson = require('../../package.json');

const configs = {
  VERSION: packageJson.version || '',
};

export const prod = {
  ...configs,
  ENVIRONMENT: 'prod',
  BASE_URL: 'https://api.baemin.vn'
};

export const dev = {
  ...configs,
  ENVIRONMENT: 'dev',
  BASE_URL: 'locahost'
};
