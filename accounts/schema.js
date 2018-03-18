const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: { type: String, trim: true, required: true, unique: true },
  permissions: [{ type: String, trim: true, default: '' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  merchant: { type: Schema.Types.ObjectId, ref: 'Merchant' }
},
{
  timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);
