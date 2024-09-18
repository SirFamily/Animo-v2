const { User } = require("../db/index");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ msg: "No token provided" });
        }

        const arrayToken = authorization.split(" ");
        const token = arrayToken[1];
        if (arrayToken[0] !== "Bearer" || !token) {
            return createError(400, "No token");
        }

        const payload = jwt.verify(token, process.env.SECRET_KEY);

        if (typeof payload !== "object" || !payload?.id || typeof payload.id !== "string") {
            return createError(400, "Payload is invalid");
        }

        const user = await User.findOne({
            where: {
                id: payload.id
            }
        });

        if (!user) {
            return createError(400, "User not found");
        }

        const userData = user.get({ plain: true });
        delete userData.password;

        req.user = userData;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authenticate;
