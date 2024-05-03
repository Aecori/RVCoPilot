const Joi = require('joi');

const commentSchema = Joi.object({
    id: Joi.number().integer().required(),
    Username: Joi.string().required(),
    Comment: Joi.string().required(),
    Rating: Joi.number().integer().min(0).max(5).required(),
    Date: Joi.date().required()
});

const cellphoneSchema = Joi.object({
    Carrier: Joi.string().required(),
    Signal: Joi.boolean().required(),
    SignalStrength: Joi.number().integer().min(0).max(5).required()
})

const siteSchema = Joi.object({
    id: Joi.number().integer(),
    SiteName: Joi.string().required(),
    SiteDescription: Joi.string().allow(''),
    SiteLatitude: Joi.number().min(-90).max(90).required(),
    SiteLongitude: Joi.number().min(-180).max(180).required(),
    SiteType: Joi.string().required(),
    RVElectricAccess: Joi.boolean().required(),
    WaterAccess: Joi.boolean().required(),
    WifiAccess: Joi.boolean().required(),
    CellService: Joi.array().items(cellphoneSchema),
    PetsAllowed: Joi.boolean().required(),
    Recreation: Joi.array().items(Joi.string()),
    SiteRating: Joi.number().integer().min(0).max(5),
    Comments: Joi.array().items(commentSchema)
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
    CellService: Joi.array().items(cellphoneSchema),
    PetsAllowed: Joi.boolean(),
    Recreation: Joi.array().items(Joi.string())
});

const userSchema = Joi.object({
    Username: Joi.string().required(),
    SavedSites: Joi.array().items(Joi.number().integer())
});

module.exports = {
    siteSchema,
    siteUpdateSchema,
    commentSchema,
    userSchema,
    cellphoneSchema
};