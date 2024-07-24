module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define(
       'pets',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          petName: { type: Sequelize.STRING(30), allowNull: false, field: 'pet_name' },
          animalType: { type: Sequelize.STRING(20), allowNull: false, field: 'animal_type' },
          breed: { type: Sequelize.STRING(30), field: 'breed' },
         //  อย่าลืมไปแก้เล่ยส่วนของประเภท
          weight: { type: Sequelize.DECIMAL(5,2), field: 'weight' },
          height: { type: Sequelize.DECIMAL(5,2), field: 'height' },
          gender: { type: Sequelize.STRING(10), field: 'gender' },
          birthday: { type: Sequelize.DATE, field: 'birthday' },
          url: { type: Sequelize.STRING(255), field: 'url' },
          petHistory: { type: Sequelize.TEXT, field: 'pet_history' },
          userId: { type: Sequelize.STRING(36), allowNull: false, field: 'user_id' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'pets',
          timestamps: false // If you don't want Sequelize to automatically add `createdAt` and `updatedAt` fields
       }
    );
 
    return Pet;
}
