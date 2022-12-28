'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    
    static associate(models) { 
      Logs.belongsTo(models.User,{
        foreignKey:"userid",
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      })
    }
  }
  Logs.init({
    userid:DataTypes.INTEGER,
    starttime: DataTypes.DATE,
    endtime: DataTypes.DATE,
    remark: DataTypes.STRING
  }, {
    sequelize,  
    modelName: 'Logs',
  });
  return Logs;
};