"use strict";

module.exports = function(sequelize, DataTypes) {
    var Cus = sequelize.define("Cus", {
        name: { type: DataTypes.STRING, allowNull: true},
        phone: { type: DataTypes.STRING, allowNull: true},
        matchs: { type: DataTypes.INTEGER, allowNull: true},
        description: { type: DataTypes.STRING, allowNull: true}
    });

    return Cus;
};