"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const Post = require("./post.model");

const POSTGRES_URL =
  process.env.DATABASE_URL || "postgresql://postgres:1312@localhost:5432/post";

const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

module.exports = {
  db: sequelize,
  Post: Post(sequelize, DataTypes),
};

// process.env.DATABASE_URL || "postgresql://postgres:1312@localhost:5432/post";

// to create a new table in the database we need to run the following command:
// sudo -u postgres psql
// SELECT 'CREATE DATABASE <your db name>'
// WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '<your db name>')\gexec

// if (process.env.POSTGRES_URL) {
//     config = {
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false,
//             },
//         },
//         dialect: "postgres",
//         protocol: "postgres",
//         ssl: true,
//         logging: true,
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false,
//             },
//         },
//     };
// } else {
//     config = {
//         dialect: "postgres",
//         protocol: "postgres",
//         ssl: true,
//         logging: true,
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false,
//             },
//         },
//     };
// }
