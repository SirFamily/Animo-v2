const { Host, PhotosHost } = require("../db/index");

exports.listPublishedHosts = async () => {
    return Host.findAll({
        where: { publish: true }, // เงื่อนไขกรองเฉพาะที่ publish เป็น true
        include: [
            {
                model: PhotosHost,
                as: 'photosHost',
                attributes: ['url']
            }
        ]
    });
};
