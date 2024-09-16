module.exports = (sequelize, Sequelize) => {
   const BookingRequest = sequelize.define(
      'booking_request',
      {
         id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
         hostId: { type: Sequelize.STRING(36), allowNull: false, field: 'host_id' },
         roomId: { type: Sequelize.STRING(36), allowNull: false, field: 'room_id' },
         userId: { type: Sequelize.STRING(36), allowNull: false, field: 'user_id' },
         startDate: { type: Sequelize.DATE, allowNull: false, field: 'start_date' },
         endDate: { type: Sequelize.DATE, allowNull: false, field: 'end_date' },
         bookingStatus: { type: Sequelize.STRING(20), defaultValue: 'Pending', field: 'booking_status' },
         createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' },
      },
      {
         tableName: 'booking_request',
         timestamps: false
      }
   );

   return BookingRequest;
}
