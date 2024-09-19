const createError = require("../utils/createError");
const bcrypt = require('bcryptjs');
const userService = require("../service/userService");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cloudUpload = require("../utils/cloudUpload");

exports.register = async (req, res, next) => {
    try {
        console.log('Request Body:', req.body);

        const {
            firstName, lastName, email, password, phone, birthday,
            address, subDistrict, district, province, postalCode, bio
        } = req.body;

        console.log('Email:', email);
        console.log('Password:', password);

        if (!email || !password) {
            throw createError(400, 'Email and password are required');
        }

        let url = '';
        if (req.file) {
            url = await cloudUpload(req.file.path);
        }

        const userExist = await userService.getUserByEmail(email);
        if (userExist) {
            throw createError(409, 'Email already in use');
        }

        const userId = uuidv4().replace(/-/g, '');
        const hashedPassword = await bcrypt.hash(password, 10);
        const formattedBirthday = birthday ? new Date(birthday) : null;

        await userService.createUser({
            id: userId,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            birthday: formattedBirthday,
            address,
            subDistrict,
            district,
            province,
            postalCode,
            bio,
            url,
        });

        res.status(201).json({ message: "Register success" });
    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExist = await userService.getUserByEmail(email);

        if (!userExist) {
            throw createError(401, "Authentication failed! Wrong email or password");
        }

        const isMatch = await bcrypt.compare(password, userExist.password);

        if (!isMatch) {
            throw createError(401, "Invalid Password");
        }

        const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
        res.status(200).json({ message: "login success", token: token });
    } catch (err) {
        next(err);
    }
}

exports.me = async (req, res, next) => {
    console.log(req.user)
    res.json(req.user);
}


exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.user;
        const {
            firstName,
            lastName,
            email,
            phone,
            birthday,
            address,
            subDistrict,
            district,
            province,
            postalCode,
            bio
        } = req.body;
        console.log(birthday)

        const user = await userService.findUserById(id);

        if (!user) {
            return next(createError(404, "User not found"));
        }

        let url = user.url;
        if (req.file) {
            url = await cloudUpload(req.file.path);
        }
  
        const updatedData = {
            firstName: firstName !== undefined ? firstName : user.firstName,
            lastName: lastName !== undefined ? lastName : user.lastName,
            email: email !== undefined ? email : user.email,
            phone: phone !== undefined ? phone : user.phone,
            birthday: birthday !== undefined ? new Date(birthday) : user.birthday,
            address: address !== undefined ? address : user.address,
            subDistrict: subDistrict !== undefined ? subDistrict : user.subDistrict,
            district: district !== undefined ? district : user.district,
            province: province !== undefined ? province : user.province,
            postalCode: postalCode !== undefined ? postalCode : user.postalCode,
            bio: bio !== undefined ? bio : user.bio,
            url: url
        };
        await userService.updateUser(id, updatedData);
        const updatedUser = await userService.findUserById(id);

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (err) {
        next(err);
    }
};