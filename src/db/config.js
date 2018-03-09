import path from 'path';
import { homedir, userInfo } from 'os';

export default {
  development: {
    password: userInfo().username,
    dialect: 'sqlite',
    dialectModulePath: '@journeyapps/sqlcipher',
    storage: path.join(homedir(), 'vp.sqlite')
  },
  test: {
    password: userInfo().username,
    dialect: 'sqlite',
    dialectModulePath: '@journeyapps/sqlcipher',
    storage: path.join(homedir(), 'vp.sqlite')
  },
  production: {
    password: userInfo().username,
    dialect: 'sqlite',
    dialectModulePath: '@journeyapps/sqlcipher',
    storage: path.join(homedir(), 'vp.sqlite')
  }
};
