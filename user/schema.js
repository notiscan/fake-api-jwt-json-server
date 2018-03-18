const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, trim: true, required: true },
    last: { type: String, trim: true, required: true }
  },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  accounts: []
},
{
  timestamps: true
});

userSchema.pre('save', (next) => {
  const currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('User', userSchema);
