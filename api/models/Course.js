const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class Course extends Model {}

User.init({
  name: {
    type: DataTypes.STRING
  },   
  username: {
    type: DataTypes.STRING
  },   
  password: {
    type: DataTypes.STRING
  },   
}, { 
    sequelize,
    modelName: 'course',
    timestamps: false,
})

module.exports = Course;