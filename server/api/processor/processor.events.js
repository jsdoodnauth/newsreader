/**
 * Processor model events
 */

'use strict';

import {EventEmitter} from 'events';
import Processor from './processor.model';
var ProcessorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProcessorEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Processor.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProcessorEvents.emit(event + ':' + doc._id, doc);
    ProcessorEvents.emit(event, doc);
  };
}

export default ProcessorEvents;
