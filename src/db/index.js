const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.NAME_DB,    
  process.env.USER_DB,                 
  process.env.PASS_DB,    
  { 
    host: process.env.IP_DB,    
    port: process.env.PORT_DB,         
    dialect: process.env.DIALECT_DB,     
    define: { timestamps: false }, 
    logging: false        
  }
);

const db = {};


db.Sequelize = Sequelize; 
db.sequelize = sequelize;


db.Admin = require('./model/admin')(sequelize, Sequelize); 
db.User = require('./model/user')(sequelize, Sequelize); 
db.Pet = require('./model/pet')(sequelize, Sequelize); 
db.VerifyHost = require('./model/verifyHost')(sequelize, Sequelize); 
db.Host = require('./model/host')(sequelize, Sequelize); 
db.ExtraFeatures = require('./model/extraFeatures')(sequelize, Sequelize); 
db.PhotosHost = require('./model/photosHost')(sequelize, Sequelize); 
db.Room = require('./model/room')(sequelize, Sequelize); 
db.PhotosRoom = require('./model/photosRoom')(sequelize, Sequelize); 
db.SupportPet = require('./model/supportPet')(sequelize, Sequelize); 
db.BookingRequest = require('./model/bookingRequest')(sequelize, Sequelize); 
db.Payment = require('./model/payment')(sequelize, Sequelize); 
db.Reviews = require('./model/reviews')(sequelize, Sequelize); 
db.PetCountBooking = require('./model/petCountBooking')(sequelize, Sequelize);


db.Admin.hasMany(db.VerifyHost, { foreignKey: { name: 'admin_id', field: 'admin_id' } }); 
db.VerifyHost.belongsTo(db.Admin, { foreignKey: 'admin_id' });

db.User.hasMany(db.Pet, { foreignKey: { name: 'user_id', field: 'user_id' } }); 
db.Pet.belongsTo(db.User, { foreignKey: 'user_id' });

db.Host.hasMany(db.ExtraFeatures, { foreignKey: { name: 'host_id', field: 'host_id' },}); 
db.ExtraFeatures.belongsTo(db.Host, { foreignKey: 'host_id' });

db.Host.hasMany(db.PhotosHost, { foreignKey: 'host_id', as: 'photosHost',}); 
db.PhotosHost.belongsTo(db.Host, { foreignKey: 'host_id', as: 'host' });

db.Host.hasMany(db.Room, { foreignKey: 'host_id', as: 'rooms',}); 
db.Room.belongsTo(db.Host, { foreignKey: 'host_id', as: 'host' });

db.Room.hasMany(db.PhotosRoom, { foreignKey: 'room_id', as: 'photosRoom',}); 
db.PhotosRoom.belongsTo(db.Room, { foreignKey: 'room_id', as: 'room' });

db.Room.hasMany(db.SupportPet, { foreignKey: { name: 'room_id', field: 'room_id' }, as: 'supportPets' });
db.SupportPet.belongsTo(db.Room, { foreignKey: 'room_id', as: 'room' });

db.Host.hasMany(db.BookingRequest, { foreignKey: { name: 'host_id', field: 'host_id' },}); 
db.BookingRequest.belongsTo(db.Host, { foreignKey: 'host_id' });

db.Room.hasMany(db.BookingRequest, { foreignKey: { name: 'room_id', field: 'room_id' },}); 
db.BookingRequest.belongsTo(db.Room, { foreignKey: 'room_id' });

db.User.hasMany(db.BookingRequest, { foreignKey: { name: 'user_id', field: 'user_id' },}); 
db.BookingRequest.belongsTo(db.User, { foreignKey: 'user_id' });

db.BookingRequest.hasMany(db.Payment, { foreignKey: { name: 'booking_id', field: 'booking_id' },}); 
db.Payment.belongsTo(db.BookingRequest, { foreignKey: 'booking_id' });

db.Pet.hasMany(db.PetCountBooking, { foreignKey: { name: 'pet_id', field: 'pet_id' },}); 
db.PetCountBooking.belongsTo(db.Pet, { foreignKey: 'pet_id' });

db.BookingRequest.hasMany(db.PetCountBooking, { foreignKey: { name: 'booking_id', field: 'booking_id' },}); 
db.PetCountBooking.belongsTo(db.BookingRequest, { foreignKey: 'booking_id' });

db.Host.hasMany(db.Reviews, { foreignKey: { name: 'host_id', field: 'host_id' },}); 
db.Reviews.belongsTo(db.Host, { foreignKey: 'host_id' });

db.User.hasMany(db.Reviews, { foreignKey: { name: 'user_id', field: 'user_id' },}); 
db.Reviews.belongsTo(db.User, { foreignKey: 'user_id' });

db.User.hasMany(db.Host, { foreignKey: 'user_id', as: 'hosts' });
db.Host.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });


module.exports = db;
