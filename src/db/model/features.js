module.exports = (sequelize, Sequelize) => {
   const Features = sequelize.define(
      'features',
      {
         id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, field: 'id' },
         name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
         price: { type: Sequelize.FLOAT, allowNull: false, field: 'price' },
         status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'Not Ready', field: 'status' },
         createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' },
         hostId: { type: Sequelize.STRING(36), allowNull: false, field: 'host_id' }
      },
      {
         tableName: 'features',
         timestamps: false
      }
   );

   return Features;
}
