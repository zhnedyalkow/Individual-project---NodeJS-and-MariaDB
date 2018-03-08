'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    laptop: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    url: DataTypes.STRING,
    providerId: DataTypes.INTEGER,
  }, {});
  Brand.associate = function(models) {
    const {
      Specifications,
      Provider,
    } = models;

    Brand.hasOne(Provider);
    Brand.hasOne(Specifications);
    Provider.hasMany(Brand);
  };
  return Brand;
};
