import { PropertyModel } from "../models/propertyModel.js";
import { UserModel } from "../models/userModel.js";
import { addPropertyValidator } from "../validators/property.js";

// Add a new property
export const addProperty = async (req, res, next) => {
    try {
        const { error, value } = addPropertyValidator.validate({
            ...req.body,
            pictures: req.files?.map(file => file.filename)
        });

        // Ensure host is a valid user with the 'host' role
        const host = await UserModel.findById(hostId);
        if (!host || host.role !== 'host') {
            return res.status(400).json({ message: "Invalid or unauthorized host ID" });
        }

        // Create and save the new property
        const newProperty = await PropertyModel.create({
            ...value,
            host: host._id
        });
        res.status(201).json(newProperty);
    } catch (err) {
        next(err);
    }
};

// Get all properties (optionally with filters and sorting)
export const getProperties = async (req, res, next) => {
    try {
        const { filter, sort } = req.query;

        let query = filter ? JSON.parse(filter) : {};
        let sortOptions = sort ? JSON.parse(sort) : {};

        // Filter by host username if provided
        if (query.hostUsername) {
            const host = await UserModel.findOne({ username: query.hostUsername, role: 'host' });
            if (!host) {
                return res.status(400).json({ message: 'Host not found' });
            }
            query.host = host._id;
            delete query.hostUsername;
        }

        const properties = await PropertyModel
            .find(query)
            .populate('host', 'username email') // only return selected host fields
            .sort(sortOptions);

        res.json(properties);
    } catch (error) {
        next(error);
    }
};

//Get one property
export const getProperty = async(req, res, next) => {
    const property = await PropertyModel.findById(req.params.id)
    res.status(200).json({"single property": property})
}

// Update a property by ID
export const updateProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.id;
        const {
            title,
            description,
            location,
            pricePerNight,
            photos,
            amenities,
            hostId
        } = req.body;

        // Validate the host if hostId is updated
        if (hostId) {
            const host = await UserModel.findById(hostId);
            if (!host || host.role !== 'host') {
                return res.status(400).json({ message: "Invalid host ID" });
            }
        }

        const updatedProperty = await PropertyModel.findByIdAndUpdate(
            propertyId,
            {
                title,
                description,
                location,
                pricePerNight,
                photos,
                amenities,
                host: hostId
            },
            { new: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json(updatedProperty);
    } catch (error) {
        next(error);
    }
};

// Delete a property by ID
export const deleteProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.id;

        const deletedProperty = await PropertyModel.findByIdAndDelete(propertyId);

        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        next(error);
    }
};
