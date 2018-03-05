import path from 'path';
import { Sequelize } from 'sequelize';
import { homedir } from 'os';

import * as models from './models';

// Sequelize is a constructor
const sequelize = new Sequelize('vilaippattiyal', null, null, {
  dialect: 'sqlite',
  storage: path.join(homedir(), 'db.sqlite')
});

const vpModels = {};

Object.keys(models).forEach(name => {
  vpModels[name] = models[name].call(models[name], sequelize, name);
});

Object.keys(vpModels).forEach(name => {
  if (vpModels[name].createHooks) {
    vpModels[name].createHooks(vpModels[name]);
  }
  if (vpModels[name].associate) {
    vpModels[name].associate(vpModels);
  }
});

vpModels.sequelize = sequelize;

const setupDb = () => vpModels.sequelize.sync({
  force: false
});

export default {
  setupDb,
  Db: vpModels
};
