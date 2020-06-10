const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // stuff here
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  source: {
    type: String,
    default: 'local'
  },
  oauth: String
}, { timestamps: true });

userSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'The e-mail field must be valid')

userSchema.pre("save", function(next) {
  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});
});

userSchema.methods.comparePassword = function(plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const User = mongoose.model("user", userSchema);


module.exports = User;
