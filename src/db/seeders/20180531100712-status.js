export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Status', [
      {
        name: true,
        statusId: Sequelize.UUIDV4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: false,
        statusId: Sequelize.UUIDV4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Status', null, {});
  }
};
