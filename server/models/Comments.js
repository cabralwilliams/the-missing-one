const { Schema , model} = require("mongoose");
const repliesSchema = require('./Replies');

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
    // case_id:{
    //     type:Schema.Types.ObjectId,
    //     ref: 'Cases'
    // },

    replies: [repliesSchema],
    
},
{
    toJSON: {
      getters: true
    }
  }


);

const Comments = model('Comments', CommentSchema);
module.exports = CommentSchema;