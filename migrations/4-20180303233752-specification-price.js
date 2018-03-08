'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addColumn('Specifications', 'price', {
      type: Sequelize.DOUBLE,
      allowNull: false,
      after: 'weight',
      defaultValue: 0,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Specifications', 'price');
  },
};
