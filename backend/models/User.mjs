import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },// match parameter to accept email ids in proper format from given regex, which will be checked by node assert
    password:{
        type: String,
        required : true
    },
    counter:{
        type: Number,
        default: 0
    },
    isBlocked:{
        type: Boolean,
        default: false
    }
})
const User = mongoose.model('user', userSchema)

export {User}