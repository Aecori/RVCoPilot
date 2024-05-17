const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const ds = require('./datastore');
const datastore = ds.datastore;
const math = require('mathjs');
const { PropertyFilter } = require('@google-cloud/datastore');
const e = require('express');
const USER = 'User';

const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { DOMAIN } = require('./auth');

// FOR TESTING PURPOSES ONLY, NOT TO BE USED IN PRODUCTION

/* ------------- Begin Users Middleware ------------- */
const { authorizationHeaderExists } = require('./middleware/middleware.js');

checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `${DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    issuer: `${DOMAIN}/`,
    algorithms: ['RS256'],
  });

/* ------------- End Users Middleware ------------- */

function getUser(id) {
    const key = datastore.key([USER, parseInt(id, 10)]);
    return datastore.get(key).then( (entity) => {
        if (entity[0] === undefined) {
            return null;
        }
        return entity;
    });
}

function putSiteInUserList(user_id, site_id) {
    const key = datastore.key([USER, parseInt(user_id, 10)]);
    return datastore.get(key).then( (entity) => {
        if (entity[0] === undefined) {
            return null;
        }
        const user = {
            id: entity[0].id,
            Username: entity[0].Username,
            SavedSites: entity[0].SavedSites
        };
        user.SavedSites.push(site_id);
        return datastore.save({ "key": key, "data": user });
    });
}

function checkIfUserExists(user_id) {
    const key = datastore.key([USER, parseInt(user_id, 10)]);
    return datastore.get(key).then( (entity) => {
        if (entity[0] === undefined) {
            return false;
        }
        return true;
    });
}

function createNewUser(user_id) {
    const key = datastore.key([USER, parseInt(user_id, 10)]);
    const user = {
        id: key.id,
        "Username": user_id,
        "SavedSites": [],
        "Bio": ""
    };
}

router.get('/', (req, res) => {
    // Get user ID from JSON
    const user = getUser(req.body.Username)
    .then( (user) => {
        if (user === null) {
            res.status(404).json({Error: "No user with this user_id exists"});
            return;
        }
        res.status(200).json(user);
    });
});

router.put('/', (req, res) => {
    // Check if user exists
    checkIfUserExists(req.body.Username)
    .then( (exists) => {
        if (exists) {
            res.status(409).json({Error: "User already exists"});
            return;
        }
        createNewUser(req.body.Username);
        res.status(201).end();
    });
});

router.put('/sites/:site_id', (req, res) => {
    putSiteInUserList(req.body.Username, req.params.site_id)
    .then( (result) => {
        if (result === null) {
            res.status(404).json({Error: "No user with this user_id exists"});
            return;
        }
        res.status(204).end();
    });
});
