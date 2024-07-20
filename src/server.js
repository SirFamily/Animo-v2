require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/index.js');

const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/notFound");

const authRoute = require("./routers/auth-route");
const petsRoute = require("./routers/pet-route");

const cre = `░█▀▀░█▀▄░█▀▀░█▀█░▀█▀░█▀▀░█▀▄░░░█▀▄░█░█
░█░░░█▀▄░█▀▀░█▀█░░█░░█▀▀░█░█░░░█▀▄░░█░
░▀▀▀░▀░▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀▀░░░░▀▀░░░▀░`;
const str = `░█▀▀░▀█▀░█▀▄░█▀▀░█▀█░█▄█░▀█▀░█░░░█░█
░▀▀█░░█░░█▀▄░█▀▀░█▀█░█░█░░█░░█░░░░█░
░▀▀▀░▀▀▀░▀░▀░▀░░░▀░▀░▀░▀░▀▀▀░▀▀▀░░▀░`;
const line = `░▀▄░░▀▄░░▀▄░░▀▄░░▀▄░░░▄▀░░▄▀░░▄▀░░▄▀░░▄▀
░░▄▀░░▄▀░░▄▀░░▄▀░░▄▀░▀▄░░▀▄░░▀▄░░▀▄░░▀▄░
░▀░░░▀░░░▀░░░▀░░░▀░░░░░▀░░░▀░░░▀░░░▀░░░▀`;

    app.use(cors());
    app.use(express.json());

    app.use("/auth", authRoute);
    app.use("/pets", petsRoute);
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
    
    db.sequelize.sync({ force: true });
    console.log('The table for the User model was just (re)created!');
