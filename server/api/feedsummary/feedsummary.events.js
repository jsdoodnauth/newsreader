/**
 * Feedsummary model events
 */

'use strict';

import {EventEmitter} from 'events';
import Feedsummary from './feedsummary.model';
var FeedsummaryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FeedsummaryEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Feedsummary.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FeedsummaryEvents.emit(event + ':' + doc._id, doc);
    FeedsummaryEvents.emit(event, doc);
  };
}

export default FeedsummaryEvents;
