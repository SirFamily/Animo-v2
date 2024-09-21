const { VerifyHost, Host, PhotosHost } = require("../db/index");


exports.updateVerificationStatus = async ({ id, hostId, adminId, newStatus }) => {
    return await VerifyHost.update({ 
        verifyStatus: newStatus, 
        adminId: adminId, 
        verifiedAt: new Date() 
    },
    {
        where: { id, hostId }  // This is the where clause that specifies which record to update
    });
};

exports.listVerifyByPending = async () => {
    return await VerifyHost.findAll({
        where: { verifyStatus: 'Pending' }
    });
}

exports.verifyByDetail = async (id) => {
    return await VerifyHost.findOne({
      where: { id },
      include: [
        {
          model: Host,
          as: 'host',
          include: [
            {
              model: PhotosHost,
              as: 'photosHost',
            },
          ],
        },
      ],
    });
  };
  