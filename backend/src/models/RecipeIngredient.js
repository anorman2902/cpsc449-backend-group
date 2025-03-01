// Many-to-Many table for Recipes & Ingredients
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');

const RecipeIngredient = sequelize.define('RecipeIngredient', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    recipe_id: { type: DataTypes.UUID, allowNull: false, references: { model: Recipe, key: 'id' } },
    ingredient_id: { type: DataTypes.UUID, allowNull: false, references: { model: Ingredient, key: 'id' } },
    quantity: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: false });

// Many-to-Many Relationship: Recipes ↔ Ingredients
Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, foreignKey: 'recipe_id' });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: 'ingredient_id' });

module.exports = RecipeIngredient;
