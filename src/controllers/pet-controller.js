const cloudUpload = require("../utils/cloudUpload");
const createError = require("../utils/createError");
const petService = require("../service/petService");

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
        const petData = {
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
    const { uid } = req.params;
    try {
        const data = await petService.listpets({ userId: uid });

        res.status(200).json({
            status: 'success',
            data,
        });
    } catch (err) {
        next(err);
    }
};