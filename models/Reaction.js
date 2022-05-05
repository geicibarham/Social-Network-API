const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {

        reactionBody: {
            type: String,
            trim: true,
            required: true
        },
        reactionId: {
            type: String,
        },

        toJSON: {
            getters: true
        }
    }
);



const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;
