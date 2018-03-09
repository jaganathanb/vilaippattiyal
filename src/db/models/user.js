import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const UserModel = (sequelizeInstance, name) => {
  const User = sequelizeInstance.define(name, {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      required: true
    },
    role: {
      type: Sequelize.ENUM,
      values: ['user', 'admin', 'disabled'],
      defaultValue: 'admin'
    },
    lastName: {
      type: Sequelize.STRING
    },
    // username is really an email address
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // hashed password
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
  }, {
    freezeTableName: true,
      indexes: [{ unique: true, fields: ['email'] }]
    });

  User.hashPasswordBeforeSave = async (user, options) => {
    try {
      const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
      return user.setDataValue('password', hash);
    } catch (error) {
      return options.sequelize.Promise.reject(error);
    }
  };

  User.createHooks = (user) => {
    user.hook('beforeCreate', user.hashPasswordBeforeSave);
    user.hook('beforeUpdate', user.hashPasswordBeforeSave);
  };

  User.prototype.isPasswordValid = async function isPasswordValid(passwordInput) {
    return bcrypt.compare(passwordInput, this.password);
  };

  return User;
};


export default UserModel;
