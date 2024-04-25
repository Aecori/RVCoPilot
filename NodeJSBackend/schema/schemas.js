const Joi = require('joi');

const siteSchema = Joi.object({
    id: Joi.number().integer(),
    SiteName: Joi.string().required(),
    SiteDescription: Joi.string(),
    SiteLatitude: Joi.number().min(-90).max(90).required(),
    SiteLongitude: Joi.number().min(-180).max(180).required(),
    SiteType: Joi.string().required(),
    RVElectricAccess: Joi.boolean().required(),
    WaterAccess: Joi.boolean().required(),
    WifiAccess: Joi.boolean().required(),
    CellService: Joi.boolean().required(),
    PetsAllowed: Joi.boolean().required(),
    Recreation: Joi.array().items(Joi.string()),
    SiteRating: Joi.number().integer().min(0).max(5),
    Comments: Joi.array().items(Joi.object({
        Comment: Joi.string(),
        Rating: Joi.number().integer().min(0).max(5),
        Date: Joi.date()
    }))
});

const siteUpdateSchema = Joi.object({
    SiteName: Joi.string(),
    SiteDescription: Joi.string(),
    SiteLatitude: Joi.number().min(-90).max(90),
    SiteLongitude: Joi.number().min(-180).max(180),
    SiteType: Joi.string(),
    RVElectricAccess: Joi.boolean(),
    WaterAccess: Joi.boolean(),
    WifiAccess: Joi.boolean(),
    CellService: Joi.boolean(),
    PetsAllowed: Joi.boolean(),
    Recreation: Joi.array().items(Joi.string())
});

const commentSchema = Joi.object({
    id: Joi.number().integer(),
    Comment: Joi.string().required(),
    Rating: Joi.number().integer().min(0).max(5).required(),
    Date: Joi.date().required()
});

const userSchema = Joi.object({
    Username: Joi.string().required(),
    SavedSites: Joi.array().items(Joi.number().integer())
});

module.exports = {
    siteSchema,
    siteUpdateSchema,
    commentSchema,
    userSchema
};