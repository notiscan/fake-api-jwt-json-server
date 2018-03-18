const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  accounts: [],
  email: { type: String, trim: true, required: true, unique: true },
  firstname: { type: String, trim: true, required: true },
  lastname: { type: String, trim: true, required: true },
  password: { type: String, trim: true, required: true },
  passwords: [{ type: String, trim: true, default: '' }]
},
{
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (this.passwords.includes(this.password)) {
    const err = new Error('something went wrong');
    next(err); return;
  }

  if (!this.passwords.includes(this.password)) {
    this.passwords.push(this.password);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
