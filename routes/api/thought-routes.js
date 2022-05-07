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

// all routes related to thoughts
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

    // all routes that need id
    router
    .route('/:id')
    .get(getThoughtById)
    .put( updateThought)
    .delete(deleteThought);

// add reaction
router.route('/:thoughtId/reactions')
.post(addReaction)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;