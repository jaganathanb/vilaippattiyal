import { Sequelize } from 'sequelize';

const RoleModel = (sequelizeInstance, name) => {
  const Role = sequelizeInstance.define(
    name,
    {
      roleId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        required: true
      }
    },
    {
      freezeTableName: true,
      indexes: [{ unique: true, fields: ['name'] }]
    }
  );

  Role.associate = (role, models) => {
    role.belongsToMany(models.User, {
      through: 'UserRoles',
      foreignKey: 'roleId',
      otherKey: 'userId'
    });
  };

  return Role;
};

export default RoleModel;
