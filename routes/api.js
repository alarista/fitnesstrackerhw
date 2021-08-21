const router = require('express').Router();
const Workouts = require('../models/workouts.js');

router.get('/api/workouts', (req, res) => {
    Workouts.aggregate([
        {
            // I got this part with the help of the solution... (alsyarista)
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});
router.post('/api/workouts', (req, res) => {
    Workouts.create({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workouts.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        // "runValidators" will ensure new exercises meet our schema requirements
        // I got this part with the help of the solution... (alsyarista)
        { new: true, runValidators: true }
    )
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});


router.get('/api/workouts/dur', (req, res) => {
    Workouts.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.delete('/api/workouts', ({ body }, res) => {
    Workouts.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;