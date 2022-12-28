'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { 
    static associate(models) {
      // define association here
      User.hasMany(models.Logs)
    }
  }
  User.init({  
    managerid:DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.TEXT,
    userrole:DataTypes.ENUM("1","2") 
  }, {
    sequelize,
    modelName: 'User',
  });  
  return User;
}; 