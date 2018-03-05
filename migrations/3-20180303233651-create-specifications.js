'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Specifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      processor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ram: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      hdd: {
        allowNull: false,
        type: Sequelize.STRING
      },
      display: {
        allowNull: true,
        type: Sequelize.DECIMAL(10, 2)  
      },
      battery: {
        type: Sequelize.STRING
      },
      weight: {
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
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Brands', 
          key: 'id'
        },
        allowNull: false
      }
    }).then(() => { 
      queryInterface.addIndex('Specifications', {
        fields: ['ram']
      });

      queryInterface.addIndex('Specifications', {
        fields: ['hdd']
      });

      queryInterface.addIndex('Specifications', {
        fields: ['processor']
      });

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Specifications');
  }
};