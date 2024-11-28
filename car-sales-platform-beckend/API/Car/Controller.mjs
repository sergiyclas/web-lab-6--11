import Car from '../../models/car.mjs';
import Image from "../../models/image.mjs";

import sharp from "sharp";
import mongoose from "mongoose";

const CARS_PER_PAGE = 52;

export const getCars = async (req, res) => {
    try {
        let {page = 1, name, priceRange, speedRange} = req.query;
        page = Number(page)

        let filterObject = {}

        if (name) {
            filterObject.name = {
                $regex: name,
                $options: "i"
            }
        }

        if (priceRange) {
            filterObject["price.value"] = {
                $gte: Number(priceRange[0]),
                $lte: Number(priceRange[1]),
            }
        }

        if (speedRange) {
            filterObject["speedInMetersPerHour"] = {
                $gte: Number(speedRange[0]),
                $lte: Number(speedRange[1]),
            }
        }

        const cars = await Car.aggregate([{
            $match: filterObject
        },{
            $addFields: {
                imageLink: {
                    $concat: ["/media/image/", {$toString: "$image"}]
                },
                cardColor: "$color"
            }
        }, {
            $skip: CARS_PER_PAGE * (page - 1),
        }, {
            $limit: CARS_PER_PAGE,
        }, {
            $project: {
                image: 0
            }
        }]);
        const documentCount = await Car.countDocuments({})
        const totalPages = Math.ceil(documentCount / CARS_PER_PAGE);
        const maxPrice = await Car.findOne({}).sort({price: -1}).select("price")
        const maxSpeed = await Car.findOne({}).sort({speedInMetersPerHour: -1}).select("speedInMetersPerHour")

        console.log(maxSpeed)
        res.status(200).json({
            status: 200,
            message: "OK",
            page: page,
            totalPages: totalPages,
            maxPrice: maxPrice?.price.value,
            maxSpeed: maxSpeed?.speedInMetersPerHour,
            body: cars,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, message: error.message});
    }
};

export const getCarsById = async (req, res) => {
    try {
        const {id} = req.params;

        let identifier = new mongoose.Types.ObjectId(id)
        let car = await Car.aggregate([{
            $match: {
                _id: identifier
            }
        }, {
            $addFields: {
                imageLink: {
                    $concat: ["/media/image/", {$toString: "$image"}]
                },
                cardColor: "$color"
            }
        }, {
            $project: {
                image: 0,
                color: 0
            }
        }]);

        if (!car) {
            return res.status(404).json({status: 404, message: "Not found. Image with the same link was not found"});
        }

        car = car[0]

        res.status(200).json({status: 200, body: car});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
};


export const createCar = async (req, res) => {
    let {
        color,
        name,
        description,
        weightInGram,
        speedInMetersPerHour,
        price
    } = req.body;

    console.log(req.body);
    price = JSON.parse(price);
    try {
        const webpBuffer = await sharp(req.file.buffer)
            .resize({
                width: 500,
                withoutEnlargement: true
            })
            .webp()
            .toBuffer();

        const newImage = new Image({
            relation: 'car',
            data: webpBuffer,
            mimetype: "image/webp",
            filename: req.file.originalname
        });

        await newImage.save();

        const car = new Car({
            image: newImage._id, color, name, description, weightInGram, speedInMetersPerHour, price
        });

        await car.save();
        res.status(201).json({status: 201, message: "Created.", body: car});
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 500, message: error.message});
    }
};


export const updateCar = async (req, res) => {
    const {id} = req.params;

    try {
        const updatedCar = await Car.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedCar) return res.status(404).json({status: 404, message: 'Sry, car was not found'});
        res.status(200).json({status: 200, message: "Ok"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


export const deleteCar = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) return res.status(404).json({status: 404, message: 'Car not found'});
        res.status(200).json({status: 200, message: 'Car deleted successfully'});
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    }
};
