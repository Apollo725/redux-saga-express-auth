const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const saltRounds = 10;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// UserSchema.pre('save', function (next) {
//   const document = this;
//   if (this.isNew || this.isModified('password')) {
//     bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
//       if (err) {
//         next(err);
//       } else {
//         document.password = hashedPassword;
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// });

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
