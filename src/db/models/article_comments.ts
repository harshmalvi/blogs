import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../index';

export default class ArticleComment extends Model {
  public id!: number;
  public nickname!: string;
  public content!: string;
  public parent_comment_id!: number;
}

ArticleComment.init(
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
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parent_comment_id: {
      type: DataTypes.NUMBER,
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
    tableName: 'article_comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
