module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define(
       'payment',
       {
          id: { type: Sequelize.STRING(36), primaryKey: true, allowNull: false, field: 'id' },
          bookingId: { type: Sequelize.STRING(36), allowNull: false, field: 'booking_id' },
          amount: { type: Sequelize.FLOAT, allowNull: false, field: 'amount' },
          status: { type: Sequelize.STRING(20), allowNull: false, defaultValue: 'Pending', field: 'status' },
          url: { type: Sequelize.STRING(255), field: 'url' },
          createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW, field: 'created_at' }
       },
       {
          tableName: 'payment',
          timestamps: false
       }
    );
 
    return Payment;
 }
 