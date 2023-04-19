const router = require('express').Router();
const {Thought} = require('../../models'); 

// get all thoughts 
router.get('/', (req, res) => {
    Thought.find({})
    .then((result) => {
        if(result) {
            res.status(200).json(result);
    
        } else {
            res.status(500).json({ message: 'something went wrong' });
        }
    })
}); 

// get a thought by it's id
router.get('/:id', (req, res) => {
    Thought.findById(req.params.id)
    .then((thought) => {
        !thought ? res.status(404).json({ message: 'No thought with that ID' }) : res.json(thought)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
});

// create a new thought 
router.post('/', (req, res) => {
    Thought.create(req.body)
    .then((thought) => {
        res.json(thought)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
}); 

// update a thought by it's id 
router.put('/:id', (req, res) => {
    Thought.findOneAndUpdate(
        {_id: req.params.id},
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((thought) => {
            !thought ? res.status(404).json({ message: 'No thought found with this id!' })
            : res.json(thought)
        })
        .catch((err) => {
            res.status(500).json(err)
            console.log(err)
        })
});

// delete a thought by its `_id
router.delete('/:id', (req, res) => {
    Thought.findOneAndDelete({_id: req.params.id})
    .then((thought) => {
        !thought ? res.status(404).json({ message: 'No thought found with this id'}) : res.status(200).json({ message: 'Thought deleted'})
    })
}); 

module.exports = router;