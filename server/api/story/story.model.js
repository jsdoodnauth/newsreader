'use strict';

import mongoose from 'mongoose';

var StorySchema = new mongoose.Schema({
  title: String,
  summary: String,
  link: String,
  pubdate: String,
  active: Boolean
});

export default mongoose.model('Story', StorySchema);
