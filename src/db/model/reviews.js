module.exports = (sequelize, Sequelize) => {
    const Reviews = sequelize.define(
       'reviews',
       {
          id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, field: 'id' },
          hostId: { type: Sequelize.STRING(36), allowNull: false, field: 'host_id' },
          userId: { type: Sequelize.STRING(36), allowNull: false, field: 'user_id' },
          rating: { type: Sequelize.FLOAT, allowNull: false, field: 'rating' },
          comment: { type: Sequelize.TEXT, field: 'comment' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'reviews',
          timestamps: false
       }
    );
 
    return Reviews;
 }
 