const { Sequelize } = require('sequelize');

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const sequelize = new Sequelize(
  process.env.NAME_DB,    // ชื่อฐานข้อมูล
  'root',                 // ชื่อผู้ใช้ฐานข้อมูล
  process.env.PASS_DB,    // รหัสผ่านฐานข้อมูล
  { 
    host: 'localhost',    // โฮสต์ของฐานข้อมูล
    port: '3306',         // พอร์ตที่ใช้เชื่อมต่อ
    dialect: 'mysql',     // ชนิดของฐานข้อมูล
    define: { timestamps: false }, // กำหนดไม่ให้ Sequelize เพิ่มฟิลด์ timestamps โดยอัตโนมัติ
    logging: true         // แสดง log ขณะทำงาน
  }
);

const db = {};

// เก็บการเชื่อมต่อและ Sequelize ในตัวแปร db
db.Sequelize = Sequelize; 
db.sequelize = sequelize;

// นำเข้าตัวแบบ (models) ต่าง ๆ
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

// กำหนดความสัมพันธ์ระหว่างตารางต่าง ๆ

// ความสัมพันธ์ระหว่าง Admin และ VerifyHost
db.Admin.hasMany(db.VerifyHost, { foreignKey: { name: 'admin_id', field: 'admin_id' } }); 
db.VerifyHost.belongsTo(db.Admin, { foreignKey: 'admin_id' });

// ความสัมพันธ์ระหว่าง User และ Pet
db.User.hasMany(db.Pet, { foreignKey: { name: 'user_id', field: 'user_id' } }); 
db.Pet.belongsTo(db.User, { foreignKey: 'user_id' });

// ความสัมพันธ์ระหว่าง Host และ ExtraFeatures
db.Host.hasMany(db.ExtraFeatures, { foreignKey: { name: 'host_id', field: 'host_id' },}); 
db.ExtraFeatures.belongsTo(db.Host, { foreignKey: 'host_id' });

// ความสัมพันธ์ระหว่าง Host และ PhotosHost (รูปภาพของ Host)
db.Host.hasMany(db.PhotosHost, { foreignKey: 'host_id', as: 'photosHost',}); 
db.PhotosHost.belongsTo(db.Host, { foreignKey: 'host_id', as: 'host' });

// ความสัมพันธ์ระหว่าง Host และ Room
db.Host.hasMany(db.Room, { foreignKey: 'host_id', as: 'rooms',}); 
db.Room.belongsTo(db.Host, { foreignKey: 'host_id', as: 'host' });

// ความสัมพันธ์ระหว่าง Room และ PhotosRoom (รูปภาพของ Room)
db.Room.hasMany(db.PhotosRoom, { foreignKey: 'room_id', as: 'photosRoom',}); 
db.PhotosRoom.belongsTo(db.Room, { foreignKey: 'room_id', as: 'room' });

// ความสัมพันธ์ระหว่าง Host และ BookingRequest
db.Host.hasMany(db.BookingRequest, { foreignKey: { name: 'host_id', field: 'host_id' },}); 
db.BookingRequest.belongsTo(db.Host, { foreignKey: 'host_id' });

// ความสัมพันธ์ระหว่าง Room และ BookingRequest
db.Room.hasMany(db.BookingRequest, { foreignKey: { name: 'room_id', field: 'room_id' },}); 
db.BookingRequest.belongsTo(db.Room, { foreignKey: 'room_id' });

// ความสัมพันธ์ระหว่าง User และ BookingRequest
db.User.hasMany(db.BookingRequest, { foreignKey: { name: 'user_id', field: 'user_id' },}); 
db.BookingRequest.belongsTo(db.User, { foreignKey: 'user_id' });

// ความสัมพันธ์ระหว่าง BookingRequest และ Payment
db.BookingRequest.hasMany(db.Payment, { foreignKey: { name: 'booking_id', field: 'booking_id' },}); 
db.Payment.belongsTo(db.BookingRequest, { foreignKey: 'booking_id' });

// ความสัมพันธ์ระหว่าง Pet และ PetCountBooking
db.Pet.hasMany(db.PetCountBooking, { foreignKey: { name: 'pet_id', field: 'pet_id' },}); 
db.PetCountBooking.belongsTo(db.Pet, { foreignKey: 'pet_id' });

// ความสัมพันธ์ระหว่าง BookingRequest และ PetCountBooking
db.BookingRequest.hasMany(db.PetCountBooking, { foreignKey: { name: 'booking_id', field: 'booking_id' },}); 
db.PetCountBooking.belongsTo(db.BookingRequest, { foreignKey: 'booking_id' });

// ความสัมพันธ์ระหว่าง Host และ Reviews
db.Host.hasMany(db.Reviews, { foreignKey: { name: 'host_id', field: 'host_id' },}); 
db.Reviews.belongsTo(db.Host, { foreignKey: 'host_id' });

// ความสัมพันธ์ระหว่าง User และ Reviews
db.User.hasMany(db.Reviews, { foreignKey: { name: 'user_id', field: 'user_id' },}); 
db.Reviews.belongsTo(db.User, { foreignKey: 'user_id' });

module.exports = db;
