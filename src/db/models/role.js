import { Sequelize } from 'sequelize';

const RoleModel = (sequelizeInstance, name) => {
  const Role = sequelizeInstance.define(name, {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      defaultValue: 'admin',
      required: true
    }
  }, {
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['name'] }]
  });

  Role.associate = (role, models) => {
    role.belongsToMany(models.User, { through: 'RoleUser', onDelete: 'cascade' });
  };

  return Role;
};


export default RoleModel;
