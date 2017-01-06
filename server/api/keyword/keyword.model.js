'use strict';

import mongoose from 'mongoose';

var KeywordSchema = new mongoose.Schema({
  name: String,
  category: String,
  active: Boolean
});

export default mongoose.model('Keyword', KeywordSchema);
