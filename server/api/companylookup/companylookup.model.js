'use strict';

import mongoose from 'mongoose';

var CompanylookupSchema = new mongoose.Schema({
  name: String,
  symbol: String,
  active: Boolean
});

export default mongoose.model('Companylookup', CompanylookupSchema);
