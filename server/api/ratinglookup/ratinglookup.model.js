'use strict';

import mongoose from 'mongoose';

var RatinglookupSchema = new mongoose.Schema({
  name: String,
  rating: String,
  active: Boolean
});

export default mongoose.model('Ratinglookup', RatinglookupSchema);
