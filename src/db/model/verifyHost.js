module.exports = (sequelize, Sequelize) => {
    const VerifyHost = sequelize.define(
       'verify_host',
       {
          id: {  type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, field: 'id' },
          verifyStatus: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'Pending', field: 'verify_status' },
          adminId: { type: Sequelize.STRING(36),llowNull: false, field: 'admin_id' },
          hostId: { type: Sequelize.STRING(36), field: 'host_id' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' },
          verifiedAt: { type: Sequelize.DATE,llowNull: false, field: 'verified_at' }
       },
       {
          tableName: 'verify_host',
          timestamps: false 
       }
    );
 
    return VerifyHost;
}
