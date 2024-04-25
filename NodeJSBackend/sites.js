const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const ds = require('./datastore');
const datastore = ds.datastore;
const math = require('mathjs');
var geodesic = require("geographiclib-geodesic"),
    geod = geodesic.Geodesic.WGS84, r;

const siteSchema = require('./schema/schemas').siteSchema;
const siteUpdateSchema = require('./schema/schemas').siteUpdateSchema;
const commentSchema = require('./schema/schemas').commentSchema;

const SITE = "Site";


// Helper function to calculate calculate 50 miles in all directions from a given point
function calculateFence(lat, lon){
    left = geod.Direct(lat, lon, 270, math.round(50 * 1609.34, 2));
    right = geod.Direct(lat, lon, 90, math.round(50 * 1609.34, 2));
    up = geod.Direct(lat, lon, 0, math.round(50 * 1609.34, 2));
    down = geod.Direct(lat, lon, 180, math.round(50 * 1609.34, 2));
    let fence = {
        latMin: down.lat2,
        latMax: up.lat2,
        lonMin: left.lon2,
        lonMax: right.lon2
    }
    return fence;
}

// Get all sites
async function getSites(req){
    let query = datastore.createQuery(SITE);
    return datastore.runQuery(query).then( (results) => {
        return results[0].map(ds.fromDatastore);
    });
}

// Get all sites within 50 miles of a given point
async function getFenceSites(req){
    if (!req.body.latitude || !req.body.longitude || isNaN(req.body.latitude) || isNaN(req.body.longitude)) {
        return Promise.reject('Latitude and longitude formatting error');
    } else if (isNaN(req.body.latitude) || isNaN(req.body.longitude)) {
        return Promise.reject('Latitude and longitude formatting error');
    } else if (req.body.latitude < -90 || req.body.latitude > 90 || req.body.longitude < -180 || req.body.longitude > 180) {
        return Promise.reject('Latitude must be between -90 and 90, and longitude must be between -180 and 180');
    }


    let fence = calculateFence(req.body.latitude, req.body.longitude);
    // Create query to get all sites that are within the fence
    const query = datastore.createQuery(SITE).filter('latitude', '>=', fence.latMin)
    .filter('latitude', '<=', fence.latMax)
    .filter('longitude', '>=', fence.lonMin)
    .filter('longitude', '<=', fence.lonMax);
    return datastore.runQuery(query).then( (results) => {
        return results[0].map(ds.fromDatastore);
    });
}

async function postSite(req){
    const key = datastore.key(SITE);
    const new_site = {
        "id": key.id,
        "SiteName": req.body.SiteName,
        "SiteDescription": req.body.Description,
        "SiteLatitude": req.body.SiteLatitude,
        "SiteLongitude": req.body.SiteLongitude,
        "SiteType": req.body.SiteType,
        "RVElectricAccess": req.body.RVElectricAccess,
        "WaterAccess": req.body.WaterAccess,
        "WifiAccess": req.body.WifiAccess,
        "CellService": req.body.CellService,
        "PetsAllowed": req.body.PetsAllowed,
        "Recreation": req.body.Recreation,
        "SiteRating": 0,
        "Comments": []
    };

    // Validate the new site schema
    const { error, value } = siteSchema.validate(new_site);
    if(error) {
        return Promise.reject(error);
    }
    return datastore.save({"key":key, "data":new_site}).then(() => {
        return key.id;
    });
}

async function updateSite(req) {
    const key = datastore.key([SITE, parseInt(req.params.id,10)]);
    // Check what fields are being updated
    const updated_site = {};
    if(req.body.SiteName) updated_site.SiteName = req.body.SiteName;
    if(req.body.SiteDescription) updated_site.SiteDescription = req.body.SiteDescription;
    if(req.body.SiteLatitude) updated_site.SiteLatitude = req.body.SiteLatitude;
    if(req.body.SiteLongitude) updated_site.SiteLongitude = req.body.SiteLongitude;
    if(req.body.SiteType) updated_site.SiteType = req.body.SiteType;
    if(req.body.RVElectricAccess) updated_site.RVElectricAccess = req.body.RVElectricAccess;
    if(req.body.WaterAccess) updated_site.WaterAccess = req.body.WaterAccess;
    if(req.body.WifiAccess) updated_site.WifiAccess = req.body.WifiAccess;
    if(req.body.CellService) updated_site.CellService = req.body.CellService;
    if(req.body.PetsAllowed) updated_site.PetsAllowed = req.body.PetsAllowed;
    if(req.body.Recreation) updated_site.Recreation = req.body.Recreation;

    // Validate the updated site schema
    const { error, value } = siteUpdateSchema.validate(updated_site);
    if(error) {
        return Promise.reject(error);
    }
    return datastore.get(key).then( (entity) => {
        if(entity[0] == undefined){
            return Promise.reject('Site not found');
        } else {
            return datastore.update({"key":key, "data":updated_site}).then(() => {
                return key.id;
            });
        }
    });
}

async function updateComment(req){
    const key = datastore.key([SITE, parseInt(req.params.id,10)]);
    return datastore.get(key).then( (entity) => {
        if(entity[0] == undefined){
            return Promise.reject('Site not found');
        } else {
            let site = entity[0];
            let new_comment = {
                "Comment": req.body.Comment,
                "Rating": req.body.Rating,
                "Date": new Date()
            }
            // Validate the new comment schema
            const { error, value } = commentSchema.validate(new_comment);
            if(error) {
                return Promise.reject(error);
            }
            site.Comments.push(new_comment);

            // Get the average rating of the site
            let total = 0;
            for(let i = 0; i < site.Comments.length; i++){
                total += site.Comments[i].Rating;
            }
            site.SiteRating = math.round(total / site.Comments.length, 2);
            return datastore.update({"key":key, "data":site}).then(() => {
                return key.id;
            });
        }
    });
}


/* ------------- Begin Controller Functions ------------- */
router.get('/', (req, res) => {
    const query = datastore.createQuery(SITE);
    datastore.runQuery(query).then( (results) => {
        res.status(200).json(results[0].map(ds.fromDatastore));
    });
});

router.get('/:id', (req, res) => {
    const key = datastore.key([SITE, parseInt(req.params.id,10)]);
    datastore.get(key).then( (entity) => {
        if(entity[0] == undefined){
            res.status(404).json({
                "Error": "Site not found"
            });
        } else {
            res.status(200).json(ds.fromDatastore(entity[0]));
        }
    });
})

router.get('/:latitude/:longitude', (req, res) => {
    getFenceSites(req).then( (results) => {
        res.status(200).json(results);
    })
    .catch( (error) => {
        res.status(400).json({
            "Error": error
        });
    })
});

router.post('/', (req, res) => {
    // Console log contents of request
    console.log(req.body);
    postSite(req).then( (key) => {
        res.status(201).json({
            "id": key
        });
    })
    .catch( (error) => {
        res.status(400).json({
            "Error": error
        });
    });
});

router.post('/:id/comments', (req, res) => {
    updateComment(req).then( (key) => {
        res.status(200).json({
            "id": key
        });
    })
    .catch( (error) => {
        if(error == 'Site not found'){
            res.status(404).json({
                "Error": error
            });
        } else {
            res.status(400).json({
                "Error": error
            });
        }
    });
});

router.patch('/:id', (req, res) => {
    updateSite(req).then( (key) => {
        res.status(200).json({
            "id": key
        });
    })
    .catch( (error) => {
        if(error == 'Site not found'){
            res.status(404).json({
                "Error": error
            });
        } else {
            res.status(400).json({
                "Error": error
            });
        }
    });
});

/* ------------- End Controller Functions ------------- */

module.exports = router;