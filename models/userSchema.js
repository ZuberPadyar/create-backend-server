const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 6;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        console.log("Salt: ", salt);
        return bcrypt.hash(user.password, salt);
      })
      .then((hash) => {
        console.log("Hash: ", hash);
        user.password = hash;
        next();
      })
      .catch((err) => console.error(err.message));
  });
  
  userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("cpassword")) {
      return next();
    }
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        console.log("Salt: ", salt);
        return bcrypt.hash(user.cpassword, salt);
      })
      .then((hash) => {
        console.log("Hash: ", hash);
        user.cpassword = hash;
        next();
      })
      .catch((err) => console.error(err.message));
  });
  
const User = mongoose.model("User", userSchema);

module.exports = User;
