'use strict';
module.exports = (sequelize, DataTypes) => {
  var Specifications = sequelize.define('Specifications', {
    processor: DataTypes.STRING,
    ram: DataTypes.STRING,
    video: DataTypes.STRING,
    hdd: DataTypes.STRING,
    display: DataTypes.DECIMAL(10, 2) ,
    battery: DataTypes.STRING,
    weight: DataTypes.STRING,
    brandId: DataTypes.INTEGER,
  }, {});
  Specifications.associate = function(models) {
    // associations can be defined here
  };
  return Specifications;
};