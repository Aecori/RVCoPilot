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

function getUser(username) {
    // Search for the user with their username
    const q = datastore.createQuery(USER).filter('Username', '=', username);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return null;
        }
        const user = entities[0].map(ds.fromDatastore)[0];
        return user;
    });
};

function putSiteInUserList(username, site_id) {
    // Search for the user with their username
    const q = datastore.createQuery(USER).filter('Username', '=', username);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return null;
        }
        const user = entities[0].map(ds.fromDatastore)[0];
        user.SavedSites.push(site_id);
        // Username is nickname, get the ID from user object
        const key = datastore.key([USER, parseInt(username, 10)]);
        con
        return datastore.save({ "key": key, "data": user });
    });
};

function deleteSiteFromUserList(username, site_id) {
    // Search for the user with their username
    const q = datastore.createQuery(USER).filter('Username', '=', username);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return null;
        }
        const user = entities[0].map(ds.fromDatastore)[0];
        const index = user.SavedSites.indexOf(site_id);
        if (index > -1) {
            user.SavedSites.splice(index, 1);
        }
        const key = datastore.key([USER, parseInt(username, 10)]);
        return datastore.save({ "key": key, "data": user });
    });
};

function checkIfUserExists(username) {
    // Search for user with usernmae
    const q = datastore.createQuery(USER).filter('Username', '=', username);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return false;
        }
        return true;
    });
}

function createNewUser(username) {
    const key = datastore.key(USER);
    const user = {
        id: key.id,
        "Username": username,
        "SavedSites": [],
        "Bio": ""
    };
    return datastore.save({ "key": key, "data": user }).then( () => {
        return user;
    });
}

function updateUserBio(username, bio) {
    const q = datastore.createQuery(USER).filter('Username', '=', username);
    return datastore.runQuery(q).then( (entities) => {
        if (entities[0].length === 0) {
            return null;
        }
        const user = entities[0].map(ds.fromDatastore)[0];
        user.Bio = bio;
        const key = datastore.key([USER, parseInt(username, 10)]);
        return datastore.save({ "key": key, "data": user });
    });
}

// ----------------- ROUTES ----------------- //
router.put('/', authorizationHeaderExists, checkJwt, (req, res) => {
    checkIfUserExists(req.body.Username)
    .then( (exists) => {
        if (exists === true) {
            res.status(200).end();
            return;
        } else {
            createNewUser(req.body.Username);
            res.status(201).end();
            return;
        };
    });
});

router.get('/:username', authorizationHeaderExists, checkJwt, (req, res) => {
    if (!req.params.username) {
        res.status(400).json({Error: "Username is required"});
        return;
    }

    const decoded = jwtlib.decode(req.headers.authorization.split(' ')[1], {complete: true});
    if (decoded.payload.nickname !== req.params.username) {
        res.status(403).json({Error: "You are not authorized to access this user's information"});
        return;
    }

    getUser(req.params.username)
    .then( (user) => {
        if (user === null) {
            res.status(404).json({Error: "No user with this username exists"});
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

router.put('/sites/:site_id', authorizationHeaderExists, checkJwt, (req, res) => {
    if (!req.body.Username) {
        res.status(400).json({Error: "Username is required"});
        return;
    }

    const decoded = jwtlib.decode(req.headers.authorization.split(' ')[1], {complete: true});
    if (decoded.payload.nickname !== req.body.Username) {
        res.status(403).json({Error: "You are not authorized to access this user's information"});
        return;
    }

    checkIfUserExists(req.body.Username).then( (exists) => {
        if (exists === false) {
            res.status(404).json({Error: "No user with this username exists"});
            return;
        } else {
            putSiteInUserList(req.body.Username, req.params.site_id)
            .then( (result) => {
                if (result === null) {
                    res.status(404).json({Error: "No user with this username exists"});
                    return;
                }
                res.status(204).end();
                return;
            });
            return;
        }
    });
});

router.delete('/sites/:site_id', authorizationHeaderExists, checkJwt, (req, res) => {
    // Check if user exists
    if (!req.body.Username) {
        res.status(400).json({Error: "Username is required"});
        return;
    }

    const decoded = jwtlib.decode(req.headers.authorization.split(' ')[1], {complete: true});
    if (decoded.payload.nickname !== req.body.Username) {
        res.status(403).json({Error: "You are not authorized to access this user's information"});
        return;
    }

    checkIfUserExists(req.body.Username).then( (exists) => {
        if (exists === false) {
            res.status(404).json({Error: "No user with this username exists"});
            return;
        }
        deleteSiteFromUserList(req.body.Username, req.params.site_id)
        .then( (result) => {
            if (result === null) {
                res.status(404).json({Error: "No user with this username exists"});
                return;
            }
            res.status(204).end();
        });
    });
});

router.put('/bio', authorizationHeaderExists, checkJwt, (req, res) => {7
    if (!req.body.Username) {
        res.status(400).json({Error: "Username is required"});
        return;
    }

    // Username is nickname for now, but we want to use something unique in the future.
    const decoded = jwtlib.decode(req.headers.authorization.split(' ')[1], {complete: true});
    if (decoded.payload.nickname !== req.body.Username) {
        res.status(403).json({Error: "You are not authorized to access this user's information"});
        return;
    }

    checkIfUserExists(req.body.Username).then( (exists) => {
        if (exists === false) {
            res.status(404).json({Error: "No user with this username exists"});
            return;
        }
        updateUserBio(req.body.Username, req.body.Bio)
        .then( (result) => {
            if (result === null) {
                res.status(404).json({Error: "No user with this username exists"});
                return;
            }
            res.status(204).end();
        });
    });
});

module.exports = router;
