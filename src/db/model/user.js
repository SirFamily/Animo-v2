module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
       'users',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          firstName: { type: Sequelize.STRING(50), allowNull: false, field: 'first_name' },
          lastName: { type: Sequelize.STRING(50), allowNull: false, field: 'last_name' },
          email: { type: Sequelize.STRING(50), unique: true, allowNull: false, field: 'email' },
          password: { type: Sequelize.STRING(255), allowNull: false, field: 'password' },
          phone: { type: Sequelize.STRING(10), allowNull: false, field: 'phone' },
          birthday: { type: Sequelize.DATE, field: 'birthday' },
          address: { type: Sequelize.STRING(255), field: 'address' },
          subDistrict: { type: Sequelize.STRING(50), field: 'sub_district' },
          district: { type: Sequelize.STRING(50), field: 'district' },
          province: { type: Sequelize.STRING(50), field: 'province' },
          postalCode: { type: Sequelize.STRING(10), field: 'postal_code' },
          bio: { type: Sequelize.TEXT, field: 'bio' },
          url: { type: Sequelize.STRING(255), field: 'url' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'users',
          timestamps: false 
       }
    );
 
    return User;
}
