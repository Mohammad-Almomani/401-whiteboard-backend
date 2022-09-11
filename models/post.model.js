'use strict';

const Food = (sequelize, DataTypes) => sequelize.define('Food', {
  foodName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  foodStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Food;