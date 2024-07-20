module.exports = (sequelize, Sequelize) => {
    const ExtraFeatures = sequelize.define(
       'extra_features',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
          price: { type: Sequelize.FLOAT, allowNull: false, field: 'price' },
          status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'Not Ready', field: 'status' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' },
          hostId: { type: Sequelize.STRING(36), allowNull: false, field: 'host_id' }
       },
       {
          tableName: 'extra_features',
          timestamps: false // If you don't want Sequelize to automatically add `createdAt` and `updatedAt` fields
       }
    );
 
    return ExtraFeatures;
}
