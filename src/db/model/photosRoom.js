module.exports = (sequelize, Sequelize) => {
   const PhotosRoom = sequelize.define(
      'photos_room',
      {
         id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, field: 'id' },
         url: { type: Sequelize.STRING(255), allowNull: false, field: 'url' },
         roomId: { type: Sequelize.STRING(36), allowNull: false, field: 'room_id' },
         createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
      },
      {
         tableName: 'photos_room',
         timestamps: false
      }
   );

   return PhotosRoom;
}
