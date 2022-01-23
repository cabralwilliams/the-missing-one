const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    contact_number :{
        type: Number,  
    },
    // created_cases: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Cases'
    //     }
    // ],
    created_at: {
        type: Date,
        default: Date.now
    },

    registered_helper :{
        type: Boolean
        
    }
})

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
 



const Users = model('Users', userSchema);

module.exports = Users;