module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define(
       'admin',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          firstName: { type: Sequelize.STRING(20), allowNull: false, field: 'first_name' },
          lastName: { type: Sequelize.STRING(20), allowNull: false, field: 'last_name' },
          email: { type: Sequelize.STRING(50), allowNull: false, field: 'email' },
          password: { type: Sequelize.STRING(255), allowNull: false, field: 'password' },
          phone: { type: Sequelize.STRING(10), allowNull: false, field: 'phone' },
          url: { type: Sequelize.STRING(255), allowNull: false, field: 'url' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'admin',
          timestamps: false // If you don't want Sequelize to automatically add `createdAt` and `updatedAt` fields
       }
    );
 
    return Admin;
}
