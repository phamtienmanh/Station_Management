"use strict";
module.exports = function(sequelize, DataTypes) {
    var Match = sequelize.define("Match", {
        staId: { type: DataTypes.INTEGER, allowNull: true},
        cusId1: { type: DataTypes.INTEGER, allowNull: true},
        cusId2: { type: DataTypes.INTEGER, allowNull: true},
        beginTime: { type: DataTypes.DATE, allowNull: true},
        endTime: { type: DataTypes.DATE, allowNull: true},
        money1: { type: DataTypes.INTEGER, allowNull: true},
        money2: { type: DataTypes.INTEGER, allowNull: true}
    }, {
        classMethods: {
        }
    });
    return Match;
};