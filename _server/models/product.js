'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.product_order, {
        foreignKey: "product_uuid",
        as: "product_order"
      })
    }
  }
  Product.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      // unique: {
      //   msg: "E"
      // }
    },

  }, {
    sequelize,
    modelName: 'product',
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Product;
};