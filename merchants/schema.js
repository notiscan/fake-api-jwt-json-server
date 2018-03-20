const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const merchantSchema = new Schema({
  name: { type: String, trim: true, required: true, unique: true },
  description: { type: String, trim: true, default: '' },
  gatewayId: { type: Number },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Merchant', merchantSchema);
