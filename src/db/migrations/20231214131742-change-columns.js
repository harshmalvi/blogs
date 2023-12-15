'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addColumn(
        'article_comments',
        'article_id',
        {
          type: Sequelize.INTEGER
        },
        {
          transaction
        }
      );
      await queryInterface.changeColumn(
        'article_comments',
        'nickname',
        {
          allowNull: false
        },
        {
          transaction
        }
      );
      await queryInterface.changeColumn(
        'article_comments',
        'content',
        {
          type: Sequelize.TEXT,
          allowNull: false
        },
        {
          transaction
        }
      );
      await queryInterface.changeColumn(
        'articles',
        'content',
        {
          type: Sequelize.TEXT
        },
        {
          transaction
        }
      );
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeColumn(
        'article_comments',
        'article_id',
        {
          type: Sequelize.INTEGER
        },
        {
          transaction
        }
      );
      await queryInterface.changeColumn(
        'article_comments',
        'nickname',
        {
          allowNull: true
        },
        {
          transaction
        }
      );
      await queryInterface.changeColumn(
        'article_comments',
        'content',
        {
          type: Sequelize.STRING,
          allowNull: true
        },
        {
          transaction
        }
      );
      await queryInterface.changeColumn(
        'articles',
        'content',
        {
          type: Sequelize.STRING
        },
        {
          transaction
        }
      );
    });
  }
};
