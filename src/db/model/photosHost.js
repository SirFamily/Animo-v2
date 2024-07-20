module.exports = (sequelize, Sequelize) => {
    const PhotosHost = sequelize.define(
       'photos_host',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          url: { type: Sequelize.STRING(255), allowNull: false, field: 'url' },
          hostId: { type: Sequelize.STRING(36), allowNull: false, field: 'host_id' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'photos_host',
          timestamps: false
       }
    );
 
    return PhotosHost;
 }
 