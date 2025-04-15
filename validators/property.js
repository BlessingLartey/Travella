import Joi from 'joi';

export const addPropertyValidator = Joi.object({
    title: Joi.string().required(),
    pricePerNight: Joi.number().required(),
    description: Joi.string().required(),
    host: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photos: Joi.array().items(Joi.string().required())

});





export const replaceProductValidator = Joi.object({
    title: Joi.string().required(),
    pricePerNight: Joi.number().required(),
    description: Joi.string().required(),
    host: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photos: Joi.array().items(Joi.string().required())

})