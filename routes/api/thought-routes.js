const router = require('express').Router();
const
    { getAllThought,
        getThoughtById,
        createThought,
        updateThought,
        deleteThought,
        addReaction,
        deleteReaction,
    } = require('../../controllers/thought-controller');

// get all thoughts

router.route('/').get(getAllThought);
// all routes related to thoughts
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// create one thought
router.route('/userId').post(createThought)

// add reaction
router.route('/:thoughtId/reactions').post(addReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;