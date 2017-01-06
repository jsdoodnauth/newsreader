'use strict';

import mongoose from 'mongoose';

var ProcessorSchema = new mongoose.Schema({
  title: String,
  shorttitle: String,
  summary: String,
  link: String,
  pubdate: String,
  companies: String,
  position: String,
  score: Number,
  active: Boolean
});

export default mongoose.model('Processor', ProcessorSchema);
