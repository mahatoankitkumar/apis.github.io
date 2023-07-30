require("dotenv").config();
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema ({
  user_name: {
    type : String,
    required : true,
    unique : true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  gender: {
    type: String,
    enum : ['male' , 'female' , 'others'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
    unique : true,
  },
  profilepic: {
    type: String,
    default:
      "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  update_at: {
    type: Date,
    default: Date.now,
  },
  tokens: {
    type: [
      {
        token: {
          type: String,
          required: true,
        }
      }
    ],
    maximum : 4,
  }
})

userSchema.plugin(uniqueValidator,{message :` {VALUE} already exists.`});

userSchema.methods.generateAuthToken = async function() {
  try {
    let token = jwt.sign({_id : this._id},process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token : token})
    await this.save()
    return token
  } catch(err) {
    console.log(err)
  }
};

module.exports = mongoose.model("UserDetail",userSchema)