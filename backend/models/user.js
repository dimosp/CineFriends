const mongoose = require("mongoose");
const { v1: uuidv1 } = require('uuid');
// used to hash password
const crypto = require("crypto")

// schema object to define properties of user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});


/*
Virtuals are additional fields for a given model. 
Their values can be set manually or automatically with defined functionality. 
A common virtual property is the full name of a person, composed of user’s first and last name.
Keep in mind: 
Virtual properties don’t get persisted in the database. 
They only exist logically and are not written to the document’s collection.
Link: https://mongoosejs.com/docs/tutorials/virtuals.html
*/

userSchema.virtual("password")
.set(function(password) {
    // temp variable named temp_password
    this.temp_password = password
    
    // timestamp used as salt
    this.salt = uuidv1()

    // encrypt password
    this.hashed_password = this.encryptPassword(password)

})
.get(function(){
    return this.temp_password
})


// add methods to schema
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) == this.hashed_password
    },


    encryptPassword: function(password) {
        if (!password) return "";

        try {
            return crypto.createHmac('sha256', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);

