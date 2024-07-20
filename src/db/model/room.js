module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define(
       'room',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
          type: { type: Sequelize.STRING(50), allowNull: false, field: 'type' },
          price: { type: Sequelize.FLOAT, allowNull: false, field: 'price' },
          hostId: { type: Sequelize.STRING(36), allowNull: false, field: 'host_id' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'room',
          timestamps: false
       }
    );
 
    return Room;
 }
 