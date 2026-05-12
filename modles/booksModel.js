import pool from "../config/dbconfig.js";
import { DataTypes } from "sequelize";

const Book = pool.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Required fields
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    // Optional fields
    isbn: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    author: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    publisher: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true,
        min: 1000,
        max: new Date().getFullYear(),
      },
    },

    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    language: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "English",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "books",
    timestamps: true, // createdAt, updatedAt
  },
);

export default Book;
