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

router.get('/:id', (req, res) => {
    const user = getUser(req.params.id)
    .then( (user) => {
        if (user === null) {
            res.status(404).json({Error: "No user with this user_id exists"});
            return;
        }
        res.status(200).json(user);
    });
});


router.put('/:id/sites/:site_id', (req, res) => {
    putSiteInUserList(req.params.id, req.params.site_id)
    .then( (result) => {
        if (result === null) {
            res.status(404).json({Error: "No user with this user_id exists"});
            return;
        }
        res.status(204).end();
    });
});