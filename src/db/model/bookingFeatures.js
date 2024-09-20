module.exports = (sequelize, Sequelize) => {
    const BookingFeatures = sequelize.define(
        'booking_features',
        {
            id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true,allowNull: false,field: 'id'},
            bookingId: {type: Sequelize.STRING(36),allowNull: false,field: 'booking_id',},
            featureId: {type: Sequelize.INTEGER,allowNull: false,field: 'feature_id', },
        },
        {
            tableName: 'booking_features',
            timestamps: false
        }
    );

    return BookingFeatures;
};
