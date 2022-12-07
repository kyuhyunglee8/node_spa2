'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Post, {foreignKey: 'userId', sourceKey: 'userId'});
      this.hasMany(models.Comment, {foreignKey: 'userId', sourceKey: 'userId'});
      this.hasMany(models.PostLike, {foreignKey: 'userId', sourceKey: 'userId'});
    }
  }
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};