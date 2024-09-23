module.exports = (sequelize, Sequelize) => {
   const SupportPet = sequelize.define(
      'support_pet',
      {
         id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false, field: 'id' },
         name: { type: Sequelize.STRING(50), allowNull: false, field: 'name' },
         description: { type: Sequelize.TEXT, field: 'description' }, //เอาออก
         roomId: { type: Sequelize.STRING, allowNull: false, field: 'room_id' }, // Reference to the room
         createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
      },
      {
         tableName: 'support_pet',
         timestamps: false
      }
   );

   return SupportPet;
};
