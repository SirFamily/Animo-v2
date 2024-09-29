const adminService = require("../service/adminService");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const adminExist = await adminService.getAdminByEmail(email);
        if (adminExist) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const adminId = uuidv4().replace(/-/g, '');

        await adminService.createAdmin({
            id: adminId,
            firstName,
            lastName,
            email,
            password,
            phone,
            url: '',
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
        if (!adminExist || adminExist.password !== password) {
            return res.status(401).json({ message: "Wrong email or password" });
        }

        res.status(200).json({ message: "Login successful", data: adminExist });
    } catch (err) {
        next(err);
    }
};
