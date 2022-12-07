'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'userId'});
      this.belongsTo(models.Post, {foreignKey: 'postId', targetKey: 'postId'});
    }
  }
  Comment.init({
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};