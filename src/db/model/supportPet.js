module.exports = (sequelize, Sequelize) => {
    const SupportPet = sequelize.define(
       'support_pet',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
          description: { type: Sequelize.TEXT, field: 'description' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'support_pet',
          timestamps: false
       }
    );
 
    return SupportPet;
 }
 