/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/keywords', require('./api/keyword'));
  app.use('/api/companylookups', require('./api/companylookup'));
  app.use('/api/ratinglookups', require('./api/ratinglookup'));
  app.use('/api/processors', require('./api/processor'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/stories', require('./api/story'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
