const { Schema, model } = require("mongoose");
const replySchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },

        reply_body:{
            type:String
        },

        name: {
            type: String,
            required: true
          }


    },
    {
        toJSON: {
          getters: true
        }
      }

    
    
    )

module.exports = replySchema;