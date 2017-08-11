"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sta = sequelize.define("Sta", {
    name: { type: DataTypes.STRING, allowNull: true}
  }, {
    classMethods: {
    }
  });

  return Sta;
};