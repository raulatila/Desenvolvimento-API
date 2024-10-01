// migrations/<timestamp>-add-type-to-profiles.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('profiles', 'type', {
      type: Sequelize.STRING,
      allowNull: true, // ou false, dependendo da sua necessidade
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('profiles', 'type');
  }
};