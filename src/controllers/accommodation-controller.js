const createError = require("../utils/createError");
const accommodationService = require("../service/accommodationService");
const { v4: uuidv4 } = require("uuid");
const cloudUpload = require("../utils/cloudUpload");

exports.createAccommodation = async (req, res, next) => {
    try {
        const {
            name,
            type,
            address,
            lat,
            long,
            description,
            publish
        } = req.body;
        const { uid } = req.params;

        if (!name || !type || !address || !lat || !long || !uid) {
            return next(createError(400, 'Name, type, address, latitude, longitude, and user ID are required.'));
        }
        const imagexPromiseArray = req.files.map((file) => {
            return cloudUpload(file.path)
        })

        const imgUrlArray = await Promise.all(imagexPromiseArray)


        const id = uuidv4().replace(/-/g, '');
        const accommodationData = {
            id,
            name,
            type,
            address,
            lat,
            long,
            description,
            publish: publish !== undefined ? publish : false,
            userId: uid,
        };

        const hostdata = await accommodationService.createAccommodation(accommodationData);
        const images = imgUrlArray.map((imgUrl) => {
            return {
                url: imgUrl,
            }
        })

        hostId = hostdata.id
        const data = await accommodationService.uploadPhotosHost({ images, hostId });
        console.log(data)
        res.status(201).json({
            status: 'success',
        });
    } catch (err) {
        next(err);
    }
};

// เรียกข้อมูลแบบเก่า
// exports.listAccommodations = async (req, res, next) => {
//     try {
//         const { uid } = req.params;
//         const data = await accommodationService.listAccommodations(uid);

//         // Include image URLs in the response data
//         const accommodationsData = await Promise.all(
//             data.map(async (accommodation) => {
//                 const accommodationDetails = accommodation.get({ plain: true });
//                 const images = await accommodationService.getImagesByHostId(accommodationDetails.id);
//                 return {
//                     ...accommodationDetails,
//                     images: images.map(img => ({ url: img.url }))
//                 };
//             })
//         );

//         res.status(200).json({
//             status: 'success',
//             data: accommodationsData,
//         });
//     } catch (err) {
//         next(err);
//     }
// };

// เรียกข้อมูลแบบใหม่
exports.listAccommodations = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const accommodations = await accommodationService.listAccommodationsWithImages(uid);

        res.status(200).json({
            status: 'success ',
            data: accommodations,
        });
    } catch (err) {
        next(err);
    }
};



exports.updateAccommodation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name,
            type,
            address,
            lat,
            long,
            description,
            publish
        } = req.body;

        const accommodation = await accommodationService.findAccommodationById(id);

        if (!accommodation) {
            return next(createError(404, "Accommodation not found"));
        }

        const updatedData = {
            name: name !== undefined ? name : accommodation.name,
            type: type !== undefined ? type : accommodation.type,
            address: address !== undefined ? address : accommodation.address,
            lat: lat !== undefined ? lat : accommodation.lat,
            long: long !== undefined ? long : accommodation.long,
            description: description !== undefined ? description : accommodation.description,
            publish: publish !== undefined ? publish : accommodation.publish
        };

        await accommodationService.updateAccommodation(id, updatedData);

        const updatedAccommodation = await accommodationService.findAccommodationById(id);

        res.status(200).json({
            message: "Accommodation updated successfully",
            accommodation: updatedAccommodation
        });
    } catch (err) {
        next(err);
    }
};

exports.deleteAccommodation = async (req, res, next) => {
    try {
        const { id } = req.params;
        await accommodationService.deleteAccommodationById(id);
        res.status(200).json({
            message: "Accommodation deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};
