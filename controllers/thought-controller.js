
// const res = require('express/lib/response');
const { Thought, User } = require('../models');

const ThoughtController = {

  getAllThought(req, res) {

    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate({ _id: params.userId }, { $push: { thought: _id } }, { new: true });
      })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts with this particular ID!' });
          return;
        }
        res.json(dbThoughtsData)
      })
      .catch(err => res.json(err));
  },


  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  addReaction({params, body}, res) {
    Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
    if (!dbThoughtsData) {
        res.status(404).json({message: 'No thoughts with this particular ID!'});
        return;
    }
    res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err))

},

deleteReaction({params, body}, res) {
  Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactionId: params.reactionId}}, {new: true})
  .populate({path: 'reactions', select: '-__v'})
  .select('-__v')
  .then(dbThoughtsData => {
  if (!dbThoughtsData) {
      res.status(404).json({message: 'No thoughts with this particular ID!'});
      return;
  }
  res.json(dbThoughtsData);
  })
  .catch(err => res.status(400).json(err))

}

}
module.exports = ThoughtController;