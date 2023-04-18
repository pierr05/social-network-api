const router = require('express').Router();
const { User, Thought } = require('/models');

// get all users
router.get('/api/users', (req, res) => {
    User.find({}, (err, result) => {
        if(result) {
            res.status(200).json(result);

        } else {
            res.status(500).json({ message: 'something went wrong' });
        }
    });
});

// get single user by _id
router.get('/api/users/:_id', (req, res) => {
    User.findOne({_id: req.params.id}).populate('thoughts').populate('friends')
        .then((user) => 
            !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
})

module.exports = router;