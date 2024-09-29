const cloudUpload = require("../utils/cloudUpload");
const petService = require("../service/petService");
const { v4: uuidv4 } = require("uuid");

exports.addPet = async (req, res, next) => {
    try {
        const {
            petName,
            species,
            breed,
            weight,
            height,
            gender,
            birthday,
            petHistory,
        } = req.body;
        const { uid } = req.params;
        
        console.log(req.file);

        if (!petName || !species || !uid) {
            return res.status(400).json({ message: 'Pet name, animal type, and user ID are required.' });
        }
        
        let url = null;
        if (req.file) {
            url = await cloudUpload(req.file.path);
        }
        const id = uuidv4().replace(/-/g, '');
        const petData = {
            id,
            petName,
            species,
            breed,
            weight: weight ? parseFloat(weight) : null,
            height: height ? parseFloat(height) : null,
            gender,
            birthday: birthday ? new Date(birthday) : null,
            url,
            petHistory,
            userId: uid,
        };

        await petService.newpets(petData);
        res.status(201).json({
            status: 'success',
        });
    } catch (err) {
        next(err);
    }
};

exports.listpet = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const data = await petService.listpets(uid);

        res.status(200).json({
            status: 'success',
            data: data,
        });
    } catch (err) {
        next(err);
    }
};

exports.updatePet = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const {
            petName,
            species,
            breed,
            weight,
            height,
            gender,
            birthday,
            petHistory,
        } = req.body;

        const pet = await petService.findPetById(pid);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        let url = pet.url;
        if (req.file) {
            url = await cloudUpload(req.file.path);
        }

        const updatedData = {
            petName: petName !== undefined ? petName : pet.petName,
            species: species !== undefined ? species : pet.species,
            breed: breed !== undefined ? breed : pet.breed,
            weight: weight !== undefined ? parseFloat(weight) : pet.weight,
            height: height !== undefined ? parseFloat(height) : pet.height,
            gender: gender !== undefined ? gender : pet.gender,
            birthday: birthday !== undefined ? new Date(birthday) : pet.birthday,
            url: url,
            petHistory: petHistory !== undefined ? petHistory : pet.petHistory,
        };

        await petService.updatePet(pid, updatedData);
        const updatedPet = await petService.findPetById(pid);

        res.status(200).json({
            message: "Pet updated successfully",
            pet: updatedPet,
        });
    } catch (err) {
        next(err);
    }
};

exports.deletePet = async (req, res, next) => {
    try {
        const { pid } = req.params;
        await petService.deletePetById(pid);
        res.status(200).json({
            message: "Pet deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};

exports.listPetByIdUser = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const pet = await petService.listPetByIdUser(uid);
        res.status(200).json({
            message: "Pet found successfully",
            pet: pet
        });
    } catch (err) {
        next(err);
    }
};
