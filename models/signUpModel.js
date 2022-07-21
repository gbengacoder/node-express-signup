const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required: true,
        unique : true
    }
,
    password:{
          type: String,
          required :true
    },
    date : {
        type : Date,
        default :  Date.now()
    },
},
{strict: false}
)

module.exports = mongoose.model('users'  , signUpTemplate)
 