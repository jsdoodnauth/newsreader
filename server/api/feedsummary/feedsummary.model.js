'use strict';

import mongoose from 'mongoose';

var FeedsummarySchema = new mongoose.Schema({
  name: String,
  count: Number,
  category: String,  
  keyCategory: String
});

export default mongoose.model('Feedsummary', FeedsummarySchema);
