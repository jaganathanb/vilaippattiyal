export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'User',
        roleId: Sequelize.UUIDV4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin',
        roleId: Sequelize.UUIDV4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
