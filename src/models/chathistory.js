'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatHistory extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    }
  };
  ChatHistory.init({
    message: DataTypes.STRING,
    userId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ChatHistory',
  });
  return ChatHistory;
};