import { Sequelize } from 'sequelize';

const StatusModel = (sequelizeInstance, name) => {
  const Status = sequelizeInstance.define(
    name,
    {
      statusId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      name: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        required: true
      }
    },
    {
      freezeTableName: true,
      indexes: [{ unique: true, fields: ['name'] }]
    }
  );

  Status.associate = (status, models) => {
    // status.belongsToMany(models.User, {
    //   through: 'UserStatus',
    //   foreignKey: 'userId',
    //   otherKey: 'statusId'
    // });
  };

  return Status;
};

export default StatusModel;
