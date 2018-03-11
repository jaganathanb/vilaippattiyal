import { Sequelize } from "sequelize";

import dbConfig from "./config";
import * as models from "./models";

// Sequelize is a constructor
const sequelize = new Sequelize(
  null,
  null,
  dbConfig[process.env.NODE_ENV].password,
  {
    dialect: "sqlite",
    dialectModulePath: "@journeyapps/sqlcipher",
    storage: dbConfig[process.env.NODE_ENV].storage
  }
);

const vpModels = {};

Object.keys(models).forEach(name => {
  vpModels[name] = models[name].call(models[name], sequelize, name);
});

Object.keys(vpModels).forEach(name => {
  if (vpModels[name].createHooks) {
    vpModels[name].createHooks(vpModels[name]);
  }
  if (vpModels[name].associate) {
    vpModels[name].associate(vpModels[name], vpModels);
  }
});

vpModels.sequelize = sequelize;

const setupDb = () =>
  vpModels.sequelize.sync({
    force: false
  });

export default {
  setupDb,
  Db: vpModels
};
