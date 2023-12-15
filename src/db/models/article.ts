import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';
import ArticleComment from './article_comments';

export default class Article extends Model {
  public id!: number;
  public nickname!: string;
  public title!: string;
  public content!: string;
}

Article.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'articles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

Article.hasMany(ArticleComment, {
  foreignKey: 'article_id',
  as: 'comments',
});