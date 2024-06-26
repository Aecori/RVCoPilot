const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const ds = require('./datastore');
const datastore = ds.datastore;
const math = require('mathjs');
const { PropertyFilter } = require('@google-cloud/datastore');
const e = require('express');
var geodesic = require("geographiclib-geodesic"),
    geod = geodesic.Geodesic.WGS84, r;

const siteSchema = require('./schema/schemas').siteSchema;
const siteUpdateSchema = require('./schema/schemas').siteUpdateSchema;
const commentSchema = require('./schema/schemas').commentSchema;

const SITE = "Site";
const COMMENT = "Comment";


// Helper function to calculate calculate 50 miles in all directions from a given point
function calculateFence(lat, lon){
    left = geod.Direct(lat, lon, 270, math.round(50 * 1609.34, 2));
    right = geod.Direct(lat, lon, 90, math.round(50 * 1609.34, 2));
    up = geod.Direct(lat, lon, 0, math.round(50 * 1609.34, 2));
    down = geod.Direct(lat, lon, 180, math.round(50 * 1609.34, 2));
    let fence = {
        latMin: math.round(down.lat2, 6),
        latMax: math.round(up.lat2, 6),
        lonMin: math.round(left.lon2, 6),
        lonMax: math.round(right.lon2, 6)
    }
    return fence;
}

function calculateFenceVariable(lat, lon, distance){
    left = geod.Direct(lat, lon, 270, math.round(distance * 1609.34, 2));
    right = geod.Direct(lat, lon, 90, math.round(distance * 1609.34, 2));
    up = geod.Direct(lat, lon, 0, math.round(distance * 1609.34, 2));
    down = geod.Direct(lat, lon, 180, math.round(distance * 1609.34, 2));
    let fence = {
        latMin: math.round(down.lat2, 6),
        latMax: math.round(up.lat2, 6),
        lonMin: math.round(left.lon2, 6),
        lonMax: math.round(right.lon2, 6)
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

async function getSite(req){
    const key = datastore.key([SITE, parseInt(req.params.id,10)]);
    return datastore.get(key).then( (entity) => {
        if(entity[0] == undefined){
            return Promise.reject('Site not found');
        } else {
            return ds.fromDatastore(entity[0]);
        }
    });
}

// Get all sites within 50 miles of a given point
async function getFenceSites(req){
    if (!req.params.latitude || !req.params.longitude || isNaN(req.params.latitude) || isNaN(req.params.longitude)) {
        return Promise.reject('Latitude and longitude formatting error');
    } else if (isNaN(req.params.latitude) || isNaN(req.params.longitude)) {
        return Promise.reject('Latitude and longitude formatting error');
    } else if (req.params.latitude < -90 || req.params.latitude > 90 || req.params.longitude < -180 || req.params.longitude > 180) {
        return Promise.reject('Latitude must be between -90 and 90, and longitude must be between -180 and 180');
    }
    
    // Calculate the geofence and query the datastore
    const fence = calculateFence(req.params.latitude, req.params.longitude);
    const query = datastore.createQuery(SITE)
    .filter('SiteLongitude', '>=', fence.lonMin)
    .filter('SiteLongitude', '<=', fence.lonMax);
    const results = await datastore.runQuery(query).then( (results) => {
        return results[0].map(ds.fromDatastore);
    });

    // Filter out sites that are not within the latitude fence
    let filtered_results = [];
    for(let i = 0; i < results.length; i++){
        if(results[i].SiteLatitude >= fence.latMin && results[i].SiteLatitude <= fence.latMax){
            filtered_results.push(results[i]);
        }
    }
    return filtered_results;
}

async function getFenceSitesWithDistance(req){
    if (!req.params.latitude || !req.params.longitude || isNaN(req.params.latitude) || isNaN(req.params.longitude)) {
        return Promise.reject('Latitude and longitude formatting error');
    } else if (isNaN(req.params.latitude) || isNaN(req.params.longitude)) {
        return Promise.reject('Latitude and longitude formatting error');
    } else if (req.params.latitude < -90 || req.params.latitude > 90 || req.params.longitude < -180 || req.params.longitude > 180) {
        return Promise.reject('Latitude must be between -90 and 90, and longitude must be between -180 and 180');
    }
    
    const fence = calculateFenceVariable(req.params.latitude, req.params.longitude, req.params.distance);
    const query = datastore.createQuery(SITE)
    .filter('SiteLongitude', '>=', fence.lonMin)
    .filter('SiteLongitude', '<=', fence.lonMax);
    const results = await datastore.runQuery(query).then( (results) => {
        return results[0].map(ds.fromDatastore);
    });

    // Filter out sites that are not within the latitude fence
    let filtered_results = [];
    for(let i = 0; i < results.length; i++){
        if(results[i].SiteLatitude >= fence.latMin && results[i].SiteLatitude <= fence.latMax){
            filtered_results.push(results[i]);
        }
    }
    return filtered_results;
}

async function postSite(req){
    const key = datastore.key(SITE);
    console.log(key);
    console.log(key.id);
    const new_site = {
        "id": key.id,
        "SiteName": req.body.SiteName,
        "SiteDescription": req.body.SiteDescription,
        "SiteLatitude": req.body.SiteLatitude,
        "SiteLongitude": req.body.SiteLongitude,
        "SiteType": req.body.SiteType,
        "RVElectricAccess": req.body.RVElectricAccess,
        "WaterAccess": req.body.WaterAccess,
        "WifiAccess": req.body.WifiAccess,
        "CellService": [],
        "PetsAllowed": req.body.PetsAllowed,
        "Recreation": req.body.Recreation,
        "SiteRating": 0,
        "Comments": []
    };
    console.log(new_site);

    // Validate the new site schema
    const { error, value } = siteSchema.validate(new_site);
    if(error) {
        console.log(error);
        return Promise.reject(error);
    }
    return datastore.save({"key":key, "data":new_site}).then(() => {
        return key.id;
    });
}

async function updateSite(req, results) {
    const key = datastore.key([SITE, parseInt(req.params.id,10)]);
    return datastore.get(key).then( (entity) => {
        if(entity[0] == undefined){
            return Promise.reject('Site not found');
        }

        // Get values from entity and update them if they are in the request
        const updated_site = {};
        if(req.body.hasOwnProperty('SiteName')) {
            updated_site.SiteName = req.body.SiteName;
        } else {
            updated_site.SiteName = entity[0].SiteName;
        }
        
        if(req.body.hasOwnProperty('SiteDescription')) {
            updated_site.SiteDescription = req.body.SiteDescription;
        } else {
            updated_site.SiteDescription = entity[0].SiteDescription;
        }
        
        if(req.body.hasOwnProperty('SiteLatitude')) {
            updated_site.SiteLatitude = req.body.SiteLatitude;
        } else {
            updated_site.SiteLatitude = entity[0].SiteLatitude;
        }
        
        if(req.body.hasOwnProperty('SiteLongitude')) {
            updated_site.SiteLongitude = req.body.SiteLongitude;
        } else {
            updated_site.SiteLongitude = entity[0].SiteLongitude;
        }
        
        if(req.body.hasOwnProperty('SiteType')) {
            updated_site.SiteType = req.body.SiteType;
        } else {
            updated_site.SiteType = entity[0].SiteType;
        }

        if(req.body.hasOwnProperty('RVElectricAccess')) {
            updated_site.RVElectricAccess = req.body.RVElectricAccess;
        } else {
            updated_site.RVElectricAccess = entity[0].RVElectricAccess;
        }
        
        if(req.body.hasOwnProperty('WaterAccess')) {
            updated_site.WaterAccess = req.body.WaterAccess;
        } else {
            updated_site.WaterAccess = entity[0].WaterAccess;
        }
        
        if(req.body.hasOwnProperty('WifiAccess')) {
            updated_site.WifiAccess = req.body.WifiAccess;
        } else {
            updated_site.WifiAccess = entity[0].WifiAccess;
        }
        
        if(req.body.hasOwnProperty('CellService')) {
            updated_site.CellService = req.body.CellService;
        } else {
            updated_site.CellService = entity[0].CellService;
        }
        
        if(req.body.hasOwnProperty('PetsAllowed')) {
            updated_site.PetsAllowed = req.body.PetsAllowed;
        } else {
            updated_site.PetsAllowed = entity[0].PetsAllowed;
        }
        
        if(req.body.hasOwnProperty('Recreation')) {
            updated_site.Recreation = req.body.Recreation;
        } else {
            updated_site.Recreation = entity[0].Recreation;
        }
        updated_site.SiteRating = entity[0].SiteRating;
        updated_site.Comments = entity[0].Comments;
        
        // Validate the updated site schema
        const { error, value } = siteUpdateSchema.validate(updated_site);
        if(error) {
            console.log(error);
            return Promise.reject("Invalid site data");
        }
        updated_site.id = key.id;
        return datastore.update({"key":key, "data":updated_site}).then(() => {
            console.log(updated_site);
            return updated_site;
        });
    });
}

async function postComment(req){
    const key = datastore.key([SITE, parseInt(req.params.id,10)]);
    return datastore.get(key).then( (entity) => {
        if(entity[0] == undefined){
            return Promise.reject("Site not found");
        }
        const site = entity[0];
        const new_comment_key = datastore.key(COMMENT);
        let new_comment = {
            "Username": req.body.Username,
            "Comment": req.body.Comment, 
            "Rating": req.body.Rating,
            "Date": new Date()
        }
        console.log(new_comment);
        const { error, value } = commentSchema.validate(new_comment);
        if(error) {
            return Promise.reject("Invalid comment data");
        }
        site.Comments.push(new_comment);
        // Get the average rating of the site
        let total = 0;
        for(let i = 0; i < site.Comments.length; i++){
            total += site.Comments[i].Rating;
        }
        site.SiteRating = math.round(total / site.Comments.length, 2);

        // Post the new comment as a comment
        return datastore.save({"key":new_comment_key, "data":new_comment}).then(() => {
            new_comment.id = new_comment_key.id;
            return datastore.update({"key":key, "data":site}).then(() => {
                return site;
            });
        });
    });
};

async function deleteSite(req){
    const key = datastore.key([SITE, parseInt(req.params.id,10)]);
    return datastore.delete(key);
}

async function deleteComment(siteID, commentID, username) {
    const siteKey = datastore.key([SITE, parseInt(siteID, 10)]);
    const commentKey = datastore.key([SITE, siteKey, COMMENT, parseInt(commentID, 10)]);
    const [comment] = await datastore.get(commentKey);
    if (comment === undefined) {
        return false;
    }
    // Get site to update comment count and recalculate average rating
    const site = await datastore.get(siteKey);
    let newRating = 0;
    // Check if username is the same as the one who posted the comment
    if (comment[0].Username !== username) {
        return false;
    }
    for (let i = 0; i < site[0].Comments.length; i++) {
        if (site[0].Comments[i].id === parseInt(commentID, 10) && site[0].Comments[i].Username === username) {
            site[0].Comments.splice(i, 1);
            continue;
        }
        newRating += site[0].Comments[i].Rating;
    }
    // Round to 2 decimal places
    newRating = math.round(newRating / site[0].Comments.length, 2);
    site[0].AverageRating = newRating;
    await datastore.save({ "key": siteKey, "data": site[0] });
    await datastore.delete(commentKey);
    return true;
}

/* ------------- Begin Controller Functions ------------- */
router.get('/', (req, res) => {
    getSites(req).then( (results) => {
        res.status(200).json(results);
    }).catch( (error) => {
        res.status(400).json({
            "Error": "Error getting sites"
        });
    });
});

router.get('/:id', (req, res) => {
    getSite(req).then( (results) => {
        res.status(200).json(results);
    })
    .catch( (error) => {
        res.status(404).json({
            "Error": "Site not found"
        });
    });
});

router.get('/latitude/:latitude/longitude/:longitude', (req, res) => {
    getFenceSites(req).then( (results) => {
        res.status(200).json(results);
    })
    .catch( (error) => {
        res.status(400).json({
            "Error": error
        });
    })
});

router.get('/latitude/:latitude/longitude/:longitude/distance/:distance', (req, res) => {
    if (!req.params.distance || isNaN(req.params.distance)) {
        res.status(400).json({
            "Error": "Distance must be a number"
        });
        return;
    }
    getFenceSitesWithDistance(req).then( (results) => {
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
    postSite(req).then( (key) => {
        res.status(201).json({
            "id": key
        });
    })
    .catch( (error) => {
        res.status(400).json({
            "Error": "Invalid site data"
        });
    });
});

router.post('/:id/comments', (req, res) => {
    postComment(req).then( (updated_site) => {
        res.status(200).json(updated_site);
    })
    .catch( (error) => {
        switch (error) {
            case 'Site not found':
            res.status(404).json({"Error": "Site not found"});
            break;
            case 'Invalid comment data':
            res.status(400).json({"Error": "Invalid comment data"});
            break;
            default:
            res.status(400).json({"Error": "Invalid comment data"});
        }
    })
});

router.patch('/:id', (req, res) => {
    console.log(req.body);
    updateSite(req).then( (updated_site) => {
        res.status(200).json(updated_site);
    })
    .catch( (error) => {
        switch (error) {
            case 'Site not found':
            res.status(404).json({"Error": "Site not found"});
            break;
            case 'Invalid site data':
            res.status(400).json({"Error": "Invalid site data"});
            break;
            default:
            res.status(400).json({"Error": "Invalid site data"});
        }
    });
});

router.delete('/:id', (req, res) => {
    deleteSite(req).then( () => {
        res.status(204).end();
    })
    .catch( (error) => {
        res.status(404).json({
            "Error": "Site not found"
        });
    });
})

router.delete('/:siteID/comments/:commentID', async (req, res) => {
    const siteID = req.params.siteID;
    const commentID = req.params.commentID;
    const username = req.body.Username;
    if (!username) {
        res.status(400).json({ Error: "Username is required" });
        return;
    } else if (!siteID || !commentID || isNaN(siteID) || isNaN(commentID)) {
        res.status(400).json({ Error: "Site ID or Comment ID missing/incorrect" });
        return;
    }
    const deleted = await deleteComment(siteID, commentID, username);
    if (deleted) {
        res.status(204).end();
    } else {
        res.status(404).json({ Error: "No comment with this comment_id exists" });
    }
});

/* ------------- End Controller Functions ------------- */

module.exports = router;