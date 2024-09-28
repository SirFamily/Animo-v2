const createError = require("../utils/createError");
const bcrypt = require('bcryptjs');
const adminService = require("../service/adminService");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cloudUpload = require("../utils/cloudUpload");

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;

        if (!email || !password) {
            throw createError(400, 'Email and password are required');
        }

        const adminExist = await adminService.getAdminByEmail(email);
        if (adminExist) {
            throw createError(409, 'Email already in use');
        }

        const adminId = uuidv4().replace(/-/g, '');
        
        // let url = '';
        // if (req.file) {
        //     url = await cloudUpload(req.file.path);
        // }

        await adminService.createAdmin({
            id: adminId,
            firstName,
            lastName,
            email,
            password,
            phone,
            url : '',

        });

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const adminExist = await adminService.getAdminByEmail(email);
        if (!adminExist) {
            throw createError(401, "Authentication failed! Wrong email or password");
        }

        if (!adminExist || adminExist.password !== password) {
            return res.status(401).json({message: "Wrong email or password"});
        }

        res.status(200).json({ message: "Login successful", data: adminExist });
    } catch (err) {
        next(err);
    }
};
