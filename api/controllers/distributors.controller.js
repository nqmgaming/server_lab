const { Distributors } = require('../models/');

// Create Distributor
exports.createDistributor = async (req, res, next) => {
    const data = req.body;
    console.log(data);
    if (data.name) {
        try {
            const distributor = new Distributors({
                name: data.name
            })
            await distributor.save();
            res.status(200).json(distributor);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}

// Get Distributors
exports.getDistributors = async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;
    try {
        const distributors = await Distributors.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        res.status(200).json(distributors);
    } catch (error) {
        res.status(500).json(error);
    }
}

// Get Distributor by ID
exports.getDistributorsById = async (req, res, next) => {
    const distributorId = req.params.distributorId;
    console.log(distributorId);
    if (distributorId) {
        try {
            const distributor = await Distributors.findById(distributorId);
            if (distributor) {
                res.status(200).json(distributor);
            } else {
                res.status(404).json({
                    message: 'Distributor not found'
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

// Update Distributor by ID
exports.updateDistributor = async (req, res, next) => {
    const distributorId = req.params.distributorId;
    console.log(distributorId);
    const data = req.body;
    console.log(data);

    if (distributorId) {
        if (data.name) {
            res.name = data.name;

            try {
                const distributor = await Distributors.findById(distributorId);
                if (distributor) {
                    distributor.name = data.name;
                    await distributor.save();
                    res.status(200).json(distributor);
                } else {
                    res.status(404).json({
                        message: 'Distributor not found'
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json(error);

            }
        } else {
            res.status(400).json({
                message: 'Bad Request, missing parameters'
            });
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}

// Delete Distributor by ID
exports.deleteDistributor = async (req, res, next) => {
    const distributorId = req.params.distributorId;
    console.log(distributorId);
    if (distributorId) {
        try {
            const distributor = await Distributors.findByIdAndDelete(distributorId);
            if (distributor) {
                res.status(200).json(distributor);
            } else {
                res.status(404).json({
                    message: 'Distributor not found'
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({
            message: 'Bad Request, missing parameters'
        });
    }
}

// Search Distributors
exports.searchDistributors = async (req, res, next) => {
    const query = req.query.name;
    console.log(query);
    if (query) {
        try {
            const distributors = await Distributors.find({ name: { $regex: query, $options: 'i' } });
            if (distributors.length > 0) {
                res.status(200).json(distributors);
            } else {
                res.status(404).json({
                    message: 'Distributor not found'
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