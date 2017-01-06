/**
 * Companylookup model events
 */

'use strict';

import {EventEmitter} from 'events';
import Companylookup from './companylookup.model';
var CompanylookupEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompanylookupEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Companylookup.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CompanylookupEvents.emit(event + ':' + doc._id, doc);
    CompanylookupEvents.emit(event, doc);
  };
}

export default CompanylookupEvents;
