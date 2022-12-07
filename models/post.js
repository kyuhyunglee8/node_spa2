'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'userId'});
      this.hasMany(models.Comment, {foreignKey: 'postId', sourceKey: 'postId'});
      this.hasMany(models.PostLike, {foreignKey: 'postId', sourceKey: 'postId'});
    }
  }
  Post.init({
    postId: {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    postLikeCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};