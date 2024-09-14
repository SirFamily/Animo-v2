const cloudUpload = require("../utils/cloudUpload");
const createError = require("../utils/createError");
const petService = require("../service/petService");
const { v4: uuidv4 } = require("uuid");

exports.newpet = async (req, res, next) => {
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

        if (!petName || !species || !uid) {
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
        const data = await petService.listpets(uid);
        
        const petsData = data.map(pet => pet.get({ plain: true }));
        
        console.log(petsData);
        res.status(200).json({
            status: 'success',
            data: petsData,
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
        const id = pid
        console.log(id);
        console.log(req.body);

        // Use the service function to find the pet
        const pet = await petService.findPetById(id);

        if (!pet) {
            return next(createError(404, "Pet not found"));
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
            birthday: birthday ? new Date(birthday).toISOString().slice(0, 19).replace('T', ' ') : null,
            url: url,
            petHistory: petHistory !== undefined ? petHistory : pet.petHistory,
        };

        // Update the pet using the correct function name
        await petService.updatePet(id, updatedData);
        // Load the updated data from the database
        const updatedPet = await petService.findPetById(id);

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
        const id = pid
        await petService.deletePetById(id);
        res.status(200).json({
            message: "Pet deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};

exports.listPetByIdUser = async(req,res,next) =>{
    try{
        const { id } = req.user;
        const pet = await petService.listPetByIdUser(id);
        res.status(200).json({
            message: "Pet found successfully",
            pet: pet
            });
            } catch (err) {
                next(err);
                }
                };
