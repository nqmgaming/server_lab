const { Fruits } = require('../models')
const cloudinary = require('../utils/cloudinary');
// Create Fruit
exports.createFruit = async (req, res, next) => {
    const data = req.body;
    if (data.name && data.quantity && data.price && data.status && data.description && data.distributor) {
        try {
            const images = [];
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'fruits',
                    // width: 150,
                    // height: 150,
                    // crop: 'fill'
                });
                images.push({
                    public_id: result.public_id,
                    url: result.secure_url
                });
            }
            data.image = images;
            const fruit = new Fruits(data);
            await fruit.save();
            const populatedFruit = await Fruits.findById(fruit._id).populate('distributor');
            res.status(200).json(populatedFruit);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Internal Server Error',
                stack: error.stack
            })
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}

// Get Fruits
exports.getFruits = async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    try {
        const fruits = await Fruits.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('distributor');
        res.status(200).json(fruits);
    } catch (error) {
        res.status(500).json(error);
    }
}

// Get Fruit by ID
exports.getFruitById = async (req, res, next) => {
    const fruitId = req.params.fruitId;
    if (fruitId) {
        try {
            const fruit = await Fruits.findById(fruitId).populate('distributor');
            if (fruit) {
                res.status(200).json(fruit);
            } else {
                res.status(404).json({
                    message: 'Fruit not found'
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}

// Update Fruit by ID
exports.updateFruit = async (req, res, next) => {
    const fruitId = req.params.fruitId;
    const data = req.body;
    if (fruitId) {
        try {
            const fruit = await Fruits.findById(fruitId).populate('distributor');
            if (fruit) {
                Object.assign(fruit, data);
                await fruit.save();
                res.status(200).json(fruit);
            } else {
                res.status(404).json({
                    message: 'Fruit not found'
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}

// Delete Fruit by ID
exports.deleteFruit = async (req, res, next) => {
    const fruitId = req.params.fruitId;
    if (fruitId) {
        try {
            const fruit = await Fruits.findByIdAndDelete(fruitId).populate('distributor');
            if (fruit) {
                res.status(200).json(fruit);
            } else {
                res.status(404).json({
                    message: 'Fruit not found'
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}