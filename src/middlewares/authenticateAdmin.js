const { Admin } = require("../db/index"); // Reference the Admin model
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

const authenticateAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ msg: "No token provided" });
        }

        // Extract the token from the Authorization header
        const arrayToken = authorization.split(" ");
        const token = arrayToken[1];
        if (arrayToken[0] !== "Bearer" || !token) {
            return createError(400, "No token provided or invalid token format");
        }

        // Verify the token and decode the payload
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        // Ensure the payload is valid and contains an admin ID
        if (typeof payload !== "object" || !payload?.id || typeof payload.id !== "string") {
            return createError(400, "Invalid token payload");
        }

        // Find the admin based on the ID from the payload
        const admin = await Admin.findOne({
            where: {
                id: payload.id
            }
        });

        if (!admin) {
            return createError(400, "Admin not found");
        }

        // Remove sensitive information (e.g., password) and attach admin data to request object
        const adminData = admin.get({ plain: true });
        delete adminData.password;

        // Set the admin data in the request for further use
        req.admin = adminData;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authenticateAdmin;
