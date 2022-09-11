'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const food = require('./post.model')

// const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://waleed:123123@localhost:5432/rest";

// postgres://localhost:5432/postgres (Mac user)

const POSTGRES_URL = process.env.HEROKU_POSTGRESQL_MAUVE_URL || "postgresql://postgres:newpassword@localhost:5432/food";


const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

module.exports = {
  db: sequelize,
  Food: food(sequelize, DataTypes)
}