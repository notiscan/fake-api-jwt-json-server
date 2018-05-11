const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
  email: { type: String, trim: true, required: true, unique: true },
  phone: { type: String, trim: true },
  firstname: { type: String, trim: true, required: true },
  isVerified: { type: Boolean },
  lastname: { type: String, trim: true, required: true },
  tmpPin: { type: Number },
  pin: { type: Number },
  password: { type: String, trim: true, required: true },
  passwords: [{ type: String, trim: true, default: '' }]
},
{
  timestamps: true
});

userSchema.pre('save', function (next) {
  if (this.passwords.includes(this.password)) {
    const err = new Error('Cannot use existing password');
    next(err); return;
  }

  if (!this.passwords.includes(this.password)) {
    this.passwords.push(this.password);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
