module.exports = (sequelize, Sequelize) => {
    const PetCountBooking = sequelize.define(
       'pet_count_booking',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          bookingId: { type: Sequelize.STRING(36), allowNull: false, field: 'booking_id' },
          petId: { type: Sequelize.STRING(36), allowNull: false, field: 'pet_id' },
          count: { type: Sequelize.INTEGER, allowNull: false, field: 'count' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'pet_count_booking',
          timestamps: false
       }
    );
 
    return PetCountBooking;
 }
 