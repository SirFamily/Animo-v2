require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/index.js');

const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/notFound");

const authRoute = require("./routers/auth-route");
const petsRoute = require("./routers/pet-route");
const hostRoute = require("./routers/accommodation-routes")
const roomRoute = require("./routers/room-routes")
const previewRoute = require("./routers/preview-host-routes.js")
const bookingRoute = require("./routers/booking-router")
const requestRoute = require("./routers/request-routes.js")
const historyRoute = require("./routers/history-routes.js");
const adminRoute = require("./routers/authAdmin-route.js");


const cre = `░█▀▀░█▀▄░█▀▀░█▀█░▀█▀░█▀▀░█▀▄░░░█▀▄░█░█
░█░░░█▀▄░█▀▀░█▀█░░█░░█▀▀░█░█░░░█▀▄░░█░
░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀▀░░░░▀▀░░░▀░`;
const str = `░█▀▀░▀█▀░█▀▄░█▀▀░█▀█░█▄█░▀█▀░█░░░█░█
░▀▀█░░█░░█▀▄░█▀▀░█▀█░█░█░░█░░█░░░░█░
░▀▀▀░▀▀▀░▀░▀░▀░░░▀░▀░▀░▀░▀▀▀░▀▀▀░░▀░`;
const line = `░▀▄░░▀▄░░▀▄░░▀▄░░▀▄░░░▄▀░░▄▀░░▄▀░░▄▀░░▄▀
░░▄▀░░▄▀░░▄▀░░▄▀░░▄▀░▀▄░░▀▄░░▀▄░░▀▄░░▀▄░
░▀░░░▀░░░▀░░░▀░░░▀░░░░░▀░░░▀░░░▀░░░▀░░░▀`;

// db.sequelize.sync({ force: false });
// console.log('The table for the User model was just (re)created!');

console.log("กำลังเชื่อมต่อฐานข้อมูลใช้เวลา 1 นาที")
setTimeout(() => {
  db.sequelize.sync({ force: false })
    .then(() => {
      console.log('The table for the User model was just (re)created!');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}, 60000);

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/pets", petsRoute);
app.use("/host", hostRoute);
app.use("/room", roomRoute);
app.use("/pre/host", previewRoute);
app.use("/booking", bookingRoute);
app.use("/request", requestRoute);
app.use("/history", historyRoute);
app.use("/admin", adminRoute);
app.use("*", notFoundHandler);
app.use(errorHandler);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(line);
  console.log(cre);
  console.log(str);
  console.log(line);
  console.log("----------------------------------------");
  console.log("  Server Run On http://localhost:" + port);
  console.log("----------------------------------------");
});

