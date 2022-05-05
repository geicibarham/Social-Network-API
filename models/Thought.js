const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const ThoughtSchema = new Schema({

   thoughtText: {
        type: String,
        required: 'You need to write the thought',
        
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    username: {
        type: String,
        required: true
    }
},
    {
        toJSON: {
            virtuals: true,
            getters:true
        },
        id: false
    }
);
// create pizza model using pizzaSchema

const Thought = model('Thought', ThoughtSchema);

// PizzaSchema.virtual('commentCount').get(function () {
//     return this.comments.length;
// })

// export pizza model
module.exports = Thought;