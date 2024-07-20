const cloudUpload = require("../utils/cloudUpload");
const createError = require("../utils/createError");
const petService = require("../service/petService");
const { v4: uuidv4 } = require("uuid");

exports.newpet = async (req, res, next) => {
    try {
        const {
            petName,
            animalType,
            breed,
            weight,
            height,
            gender,
            birthday,
            petHistory,
        } = req.body;
        const { uid } = req.params;

        if (!petName || !animalType || !uid) {
            return next(createError(400, 'Pet name, animal type, and user ID are required.'));
        }

        let url = '';
        if (req.file) {
            url = await cloudUpload(req.file.path);
        }
        const id = uuidv4().replace(/-/g, '');
        const petData = {
            id,
            petName,
            animalType,
            breed,
            weight: weight ? parseFloat(weight) : null,
            height: height ? parseFloat(height) : null,
            gender,
            birthday: birthday ? new Date(birthday) : null,
            url,
            petHistory,
            userId: uid,
        };
        console.log(req.body)

        await petService.newpets(petData);
        res.status(201).json({
            status: 'success',
        });
    } catch (err) {
        next(err)
    }
};


exports.listpet = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = await petService.listpets(uid);  // Pass uid directly here
        console.log(data);
        res.status(200).json({
            status: 'success',
            data,
        });
    } catch (err) {
        next(err);
    }
};
