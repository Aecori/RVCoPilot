const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const ds = require('./datastore.js');
const datastore = ds.datastore;
const math = require('mathjs');
const { PropertyFilter } = require('@google-cloud/datastore');
const e = require('express');
const jwtlib = require('jsonwebtoken');
const USER = 'User';

const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { DOMAIN } = require('./auth.js');

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

function getUser(user_id) {
    // Search for the user with their email address
    const q = datastore.createQuery(USER).filter('Username', '=', user_id);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return null;
        }
        const user = entities[0].map(ds.fromDatastore)[0];
        return user;
    });
};

function putSiteInUserList(user_id, site_id) {
    // Search for the user with their email address
    const q = datastore.createQuery(USER).filter('Username', '=', user_id);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return null;
        }
        const user = entities[0].map(ds.fromDatastore)[0];
        user.SavedSites.push(site_id);
        const key = datastore.key([USER, parseInt(user_id, 10)]);
        return datastore.save({ "key": key, "data": user });
    });
};

function deleteSiteFromUserList(user_id, site_id) {
    // Search for the user with their email address
    const q = datastore.createQuery(USER).filter('Username', '=', user_id);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return null;
        }
        const user = entities[0].map(ds.fromDatastore)[0];
        const index = user.SavedSites.indexOf(site_id);
        if (index > -1) {
            user.SavedSites.splice(index, 1);
        }
        const key = datastore.key([USER, parseInt(user_id, 10)]);
        return datastore.save({ "key": key, "data": user });
    });
};

function checkIfUserExists(user_id) {
    // Search for user with user_id (User_id is email address)
    const q = datastore.createQuery(USER).filter('Username', '=', user_id);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return false;
        }
        return true;
    });
}

function createNewUser(user_id) {
    const key = datastore.key(USER);
    const user = {
        id: key.id,
        "Username": user_id,
        "SavedSites": [],
        "Bio": ""
    };
    return datastore.save({ "key": key, "data": user }).then( () => {
        return user;
    });
}

function updateUserBio(user_id, bio) {
    const q = datastore.createQuery(USER).filter('Username', '=', user_id);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return null;
        }
        const user = entities[0].map(ds.fromDatastore)[0];
        user.Bio = bio;
        const key = datastore.key([USER, parseInt(user_id, 10)]);
        return datastore.save({ "key": key, "data": user });
    });
}

// ----------------- ROUTES ----------------- //

router.get('/:username', authorizationHeaderExists, checkJwt, (req, res) => {
    if (!req.params.username) {
        res.status(400).json({Error: "Username is required"});
        return;
    }

    const decoded = jwtlib.decode(req.headers.authorization.split(' ')[1], {complete: true});
    // Get the payload email and check if it matches the user_id
    if (decoded.payload.email !== req.params.username) {
        res.status(403).json({Error: "You are not authorized to access this user's information"});
        return;
    }

    getUser(req.params.username)
    .then( (user) => {
        if (user === null) {
            res.status(404).json({Error: "No user with this user_id exists"});
            return;
        } else if (user === false) {
            // Wrong user to be accessing this
            res.status(403).json({Error: "You are not authorized to access this user's information"});
            return;
        } else {
            res.status(200).json(user);
            return ;
        }
    });
});

router.put('/', authorizationHeaderExists, checkJwt, (req, res) => {
    // Check if user exists
    checkIfUserExists(req.body.Username)
    .then( (exists) => {
        if (exists === true) {
            // Then allow login with 200 status
            res.status(200).end();
        }
        createNewUser(req.body.Username);
        res.status(201).end();
    });
});

router.put('/sites/:site_id', authorizationHeaderExists, checkJwt, (req, res) => {
    // Check if user exists
    checkIfUserExists(req.body.Username).then( (exists) => {
        if (exists === false) {
            res.status(404).json({Error: "No user with this user_id exists"});
            return;
        }
        putSiteInUserList(req.body.Username, req.params.site_id)
        .then( (result) => {
            if (result === null) {
                res.status(404).json({Error: "No user with this user_id exists"});
                return;
            }
            res.status(204).end();
        });
    });
});

router.delete('/sites/:site_id', authorizationHeaderExists, checkJwt, (req, res) => {
    // Check if user exists
    checkIfUserExists(req.body.Username).then( (exists) => {
        if (exists === false) {
            res.status(404).json({Error: "No user with this user_id exists"});
            return;
        }
        deleteSiteFromUserList(req.body.Username, req.params.site_id)
        .then( (result) => {
            if (result === null) {
                res.status(404).json({Error: "No user with this user_id exists"});
                return;
            }
            res.status(204).end();
        });
    });
});

router.put('/bio', authorizationHeaderExists, checkJwt, (req, res) => {
    // Check if user exists
    checkIfUserExists(req.body.Username).then( (exists) => {
        if (exists === false) {
            res.status(404).json({Error: "No user with this user_id exists"});
            return;
        }
        updateUserBio(req.body.Username, req.body.Bio)
        .then( (result) => {
            if (result === null) {
                res.status(404).json({Error: "No user with this user_id exists"});
                return;
            }
            res.status(204).end();
        });
    });
});

module.exports = router;
