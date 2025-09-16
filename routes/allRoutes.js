// TODO: Routes

const express = require('express');
const router = express.Router();

// HACK: allCountries Data
const allCountries = require('../public/js/all-countries');

// INFO: Moment lib
const moment = require('moment');

// INFO: User Data From DB
const User = require('../models/customerSchema');

router.get('/user/add.html', (req, res) => {
    res.render('user/add', { allCountries: allCountries });
});

router.get('/user/view.html', (req, res) => {
    res.render('user/view');
});

router.get('/edit/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('user/edit', { infoData: result, allCountries: allCountries });
        })
        .catch((error) => {
            console.log(error);
        });
});

// INFO: POST Request
router.get('/', (req, res) => {
    // Result ==> array of objects
    User.find()
        .then((result) => {
            res.render('index', { array: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
});

// INFO: POST Request
router.post('/user/add.html', (req, res) => {
    const user = new User(req.body);
    user
        .save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

// INFO: POST Request - (Search)
router.post('/search', (req, res) => {
    const searchTerm = req.body.search.trim() || '';

    User.find({
        $or: [
            { fireName: { $regex: searchTerm, $options: 'i' } },
            { lastName: { $regex: searchTerm, $options: 'i' } },
            { gender: { $regex: searchTerm, $options: 'i' } },
            { country: { $regex: searchTerm, $options: 'i' } },
        ],
    })
        .then((result) => {
            res.render('user/search', { array: result });
        })
        .catch((err) => {
            console.log(err);
            res.render('user/search', { array: [] });
        });
});

// INFO: Delete Request
router.delete('/edit/:id', (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            console.log(error);
        });
});

// INFO: Get Request
router.get('/view/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render('user/view', { infoData: result, moment: moment });
        })
        .catch((error) => {
            console.log(error);
        });
});

// INFO: Put Request
router.put('/edit/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).then((result) => {
        res.redirect('/');
    });
});

module.exports = router;
