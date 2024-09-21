const { Admin } = require("../db/index"); 
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

const authenticateAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ msg: "No token provided" });
        }

        const arrayToken = authorization.split(" ");
        const token = arrayToken[1];
        if (arrayToken[0] !== "Bearer" || !token) {
            return createError(400, "No token provided or invalid token format");
        }

        const payload = jwt.verify(token, process.env.SECRET_KEY);

        if (typeof payload !== "object" || !payload?.id || typeof payload.id !== "string") {
            return createError(400, "Invalid token payload");
        }

        const admin = await Admin.findOne({
            where: {
                id: payload.id
            }
        });

        if (!admin) {
            return createError(400, "Admin not found");
        }

        const adminData = admin.get({ plain: true });
        delete adminData.password;

        req.admin = adminData;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authenticateAdmin;
