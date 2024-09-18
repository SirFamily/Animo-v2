module.exports = (sequelize, Sequelize) => {
    const Host = sequelize.define(
       'host',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
          type: { type: Sequelize.STRING(50), allowNull: false, field: 'type' },
          address: { type: Sequelize.STRING(255), allowNull: false, field: 'address' },
          lat: { type: Sequelize.STRING(50), allowNull: false, field: 'lat' },
          long: { type: Sequelize.STRING(50), allowNull: false, field: 'long' },
          description: { type: Sequelize.TEXT, field: 'description' },
          publish: { type: Sequelize.BOOLEAN, defaultValue: false, field: 'publish' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' },
          userId: { type: Sequelize.STRING(36), allowNull: false, field: 'user_id' }
       },
       {
          tableName: 'host',
          timestamps: false 
       }
    );
 
    return Host;
}
