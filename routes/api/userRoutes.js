const router = require('express').Router();
const { User} = require('../../models');

// get all users
router.get('/', (req, res) => {
    User.find({})
    .then((result) => {
        if(result) {
            res.status(200).json(result);
    
        } else {
            res.status(500).json({ message: 'something went wrong' });
        }
    })
});

// get single user by _id
router.get('/:id', (req, res) => {
    User.findById(req.params.id).populate('thoughts').populate('friends')
        .then((user) => {
            !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

// post new user
router.post('/', (req, res) => {
    User.create(req.body)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}); 

// update user by it's id 
router.put('/:userId', (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) => {
            !user ? res.status(404).json({ message: 'No user found with this id!' })
            : res.json(user)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

// delete a user by it's id 
router.delete('/:userId', (req, res) => {
    User.findOneAndDelete({_id: req.params.userId})
        .then((user) => {
            !user ? res.status(404).json({ message: 'No user found with this id'}) : res.status(200).json({ message: 'User deleted'})
        })
})

module.exports = router;