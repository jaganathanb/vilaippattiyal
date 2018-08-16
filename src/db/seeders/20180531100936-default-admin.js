export default {
  up: async (queryInterface, Sequelize) => {
    const status = await queryInterface.sequelize.query("SELECT statusId from Status where name = 'Admin';");

    return queryInterface.bulkInsert('User', [
      {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@vilaippattiyal.in',
        password: 'Admin@143',
        userId: Sequelize.UUIDV4,
        statusId: status[0].statusId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('User', null, {});
  }
};
