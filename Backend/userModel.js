const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
   username: { type: String, required: true, unique: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
});

UserSchema.pre('save', async function (next) {
   try {
      if (this.isModified('password')) {
         const salt = await bcrypt.genSalt(10);
         this.password = await bcrypt.hash(this.password, salt);
      }
      next();
   } catch (error) {
      next(error);
   }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
