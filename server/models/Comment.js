const { Schema , model} = require("mongoose");
const replySchema = require('./Reply');
const Case = require ('./Case')
const CommentSchema = new Schema({
    comment_text: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: String,
        default: "Anonymous"
    },
    case_id:{
        type:Schema.Types.ObjectId,
        ref: 'Case'
    },

    replies: [replySchema],
    
},
{
    toJSON: {
      getters: true
    }
  }


);

const Comment = model('Comment', CommentSchema);
module.exports = Comment;