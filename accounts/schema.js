const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const accountSchema = new Schema({
  loginHistory: [{ type: Date }],
  merchant: { type: Schema.Types.ObjectId, ref: 'Merchant' },
  permissions: [{ type: String, trim: true }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, trim: true, required: true, unique: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);
