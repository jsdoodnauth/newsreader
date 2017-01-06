/**
 * Ratinglookup model events
 */

'use strict';

import {EventEmitter} from 'events';
import Ratinglookup from './ratinglookup.model';
var RatinglookupEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RatinglookupEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Ratinglookup.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    RatinglookupEvents.emit(event + ':' + doc._id, doc);
    RatinglookupEvents.emit(event, doc);
  };
}

export default RatinglookupEvents;
