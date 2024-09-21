const { Host } = require("../db/index");
const { PhotosHost } = require("../db/index");
const { Room } = require("../db/index");
const { VerifyHost } = require("../db/index");

exports.createAccommodation = async (accommodationData) => {
    return Host.create(accommodationData);
};

exports.createVerifyhost = async (hid) => {
    return VerifyHost.create({ hostId: hid });
};

exports.listAccommodations = async (userId) => {
    return Host.findAll({
        where: { userId: userId },
    });
};

exports.updateAccommodation = async (id, updatedData) => {
    return Host.update(updatedData, {
        where: { id: id },
    });
};

exports.findAccommodationById = async (id) => {
    return Host.findOne({
        where: { id },
    });
};

exports.deleteAccommodationById = async (id) => {
    // ลบข้อมูลใน verify_host ที่สัมพันธ์กับ Host นี้ก่อน
    await VerifyHost.destroy({
        where: { hostId: id },
    });

    // ลบรูปภาพที่สัมพันธ์กับ Host นี้
    await PhotosHost.destroy({
        where: { hostId: id },
    });

    // ลบ Host หลังจากลบข้อมูลที่สัมพันธ์กันเสร็จแล้ว
    return Host.destroy({
        where: { id: id },
    });
};

exports.uploadPhotosHost = async ({ images, hostId }) => {
    const photoData = images.map((image) => ({
        url: image.url,
        hostId: hostId,
    }));

    return PhotosHost.bulkCreate(photoData);
};

exports.getImagesByHostId = async (hostId) => {
    return PhotosHost.findAll({
        where: { hostId },
    });
};

exports.listAccommodationsWithImages = async (userId) => {
    return Host.findAll({
        where: { userId: userId },
        include: [
            {
                model: PhotosHost,
                as: "photosHost",
                attributes: ["url"],
            },
            {
                model: VerifyHost,
                as: "verifyHosts",
                attributes: ["verify_status"],
            },
        ],
    });
};

exports.findAccommodationForDelete = async (id) => {
    return Host.findOne({
        where: { id: id },
        include: [
            {
                model: Room,
                as: "rooms",
            },
        ],
    });
};
