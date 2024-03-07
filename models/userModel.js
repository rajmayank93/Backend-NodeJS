const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

mongoose
  .connect(
    "mongodb+srv://rajmayank93:kaTn6vniB2C7wDVS@cluster0.lwutprh.mongodb.net"
  )
  .then(function (db) {
    console.log("user db Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

//kaTn6vniB2C7wDVS

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ["admin", "user", "deliveryboy", "restrauntowner"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/users/default.jpeg",
  },
  resetToken: String,
});

// pre post hooks
// after save events occurs in DB
userSchema.pre("save", function () {
  console.log("before saving in the database", this);
});

userSchema.post("save", function (doc) {
  console.log("after saving in the database", doc);
});

userSchema.pre("save", function () {
  this.confirmPassword = undefined;
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.password, salt);
//   //   console.log(hashedString);
//   this.password = hashedString;
// });
userSchema.methods.createResetToken = function () {
  // creating new token
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = resetToken;
  return resetToken;
};

userSchema.methods.resetPasswordHandler = function (password, confirmPassword) {
  this.password = password;
  this.confirmPassword = confirmPassword;
  this.resetToken = undefined;
};

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;

// (async function createUser() {
//   let user = {
//     name: "Mayank",
//     email: "abcg@gmail.com",
//     password: "12345678",
//     confirmPassword: "12345678",
//   };

//   let data = await userModel.create(user);
//   console.log(data);
// })();
