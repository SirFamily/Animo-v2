const { Admin } = require("../db/index");


exports.createAdmin = async (adminData) => {
    return await Admin.create(adminData);
};

exports.getAdminByEmail = async (email) => {
    return await Admin.findOne({ where: { email } });
};

exports.findAdminById = async (id) => {
    return await Admin.findOne({ where: { id } });
};
