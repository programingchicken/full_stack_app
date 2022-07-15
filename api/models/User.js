'use strict';

const { DataTypes, Model } = require('sequelize');

const bcryptjs = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model { };
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'You need a name'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notNull: {
          msg: 'You need a username'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        if (val !== "") {
          const hashedPassword = bcryptjs.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        }
      },
      validate: {
        notNull: {
          msg: 'You need a Password'
        }
      }
    }
  },
    {
      sequelize,
      modelName: 'User',
    });


  User.associate = (models) => {
    // define association here
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
  return User
}