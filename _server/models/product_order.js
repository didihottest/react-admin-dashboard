'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_order.belongsTo(models.user, {
        foreignKey: 'user_uuid',
        as: "user"
      })

      Product_order.belongsTo(models.product, {
        foreignKey: 'product_uuid',
        as: "product"
      })
    }
  }
  Product_order.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    tracking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    product_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_qty: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    total: {
      type: DataTypes.NUMERIC,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  }, {
    sequelize,
    modelName: 'product_order',
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  return Product_order;
};