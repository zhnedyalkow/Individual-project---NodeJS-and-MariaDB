'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      laptop: {
        allowNull: false,
        type: Sequelize.STRING
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      providerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Providers',
          key: 'id'
        },
        allowNull: false
      }
    }).then(() => queryInterface.addIndex('Brands', {
        fields: ['url'],
        unique: true
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Brands');
  }
};