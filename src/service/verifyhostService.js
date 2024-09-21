const { VerifyHost, Host, PhotosHost } = require("../db/index");


exports.updateVerificationStatus = async ({ id, adminId, newStatus }) => {
  if (!id) throw new Error("Invalid ID");  // Ensure ID is present
  return await VerifyHost.update({
      verifyStatus: newStatus,
      adminId: adminId,
      verifiedAt: new Date()
  }, {
      where: { id }  // Make sure ID is passed properly
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
  