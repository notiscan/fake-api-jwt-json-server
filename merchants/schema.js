const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const merchantSchema = new Schema({
  name: { type: String, trim: true, required: true, unique: true },
  description: [{ type: String, trim: true, default: '' }],
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transactions' }],
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Accounts' }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Merchant', merchantSchema);
