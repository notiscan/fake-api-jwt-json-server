const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }],
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
