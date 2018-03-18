const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const transactionSchema = new Schema({
  item: { type: String, trim: true, required: true },
  description: { type: String, trim: true, default: '' },
  merchant: { type: Schema.Types.ObjectId, ref: 'Merchant' }
},
{
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);
