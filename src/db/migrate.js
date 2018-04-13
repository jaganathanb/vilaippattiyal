import api from './index';

api.Db.sequelize
  .sync({ force: true })
  .then(() => {
    api.Db.Role.create({ name: 'Admin' })
      .then(role =>
        api.Db.Status.create({ name: 'Enabled' }).then(status =>
          api.Db.User.create({
            firstName: 'admin',
            lastName: 'admin',
            password: 'admin',
            roleId: role.id,
            statusId: status.id
          })))
      .catch(err => console.log(err));

    return process.exit();
  })
  .catch(err => console.error(err));
