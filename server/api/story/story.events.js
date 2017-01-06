/**
 * Story model events
 */

'use strict';

import {EventEmitter} from 'events';
import Story from './story.model';
var StoryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StoryEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Story.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StoryEvents.emit(`${event}:${doc._id}`, doc);
    StoryEvents.emit(event, doc);
  };
}

export default StoryEvents;
