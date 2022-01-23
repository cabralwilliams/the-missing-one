const { Schema, model } = require("mongoose");
const repliesSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
        },

        reply_body:{
            type:String
        },

        username: {
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

module.exports = repliesSchema;