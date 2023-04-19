const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction'); 

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 1-280,
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now(),
            //timestamps need to be added
            // get: (timestamps) => dateFormat(timestamps)
        }, 
        
        reactions: [reactionSchema],

    },

    {
        timestamps: true,
        toJSON: {
            getters: true
        }
    }
); 

thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reactions.length; 
}); 

const Thought = model('thought', thoughtSchema);
module.exports = Thought; 