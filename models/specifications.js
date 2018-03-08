'use strict';
module.exports = (sequelize, DataTypes) => {
  const Specifications = sequelize.define('Specifications', {
    processor: DataTypes.STRING,
    ram: DataTypes.STRING,
    video: DataTypes.STRING,
    hdd: DataTypes.STRING,
    display: DataTypes.DECIMAL(10, 2),
    battery: DataTypes.STRING,
    weight: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    brandId: DataTypes.INTEGER,
  }, {});
  Specifications.associate = function(models) {
    // associations can be defined here
  };
  return Specifications;
};