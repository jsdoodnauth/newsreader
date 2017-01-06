/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/companylookups              ->  index
 * POST    /api/companylookups              ->  create
 * GET     /api/companylookups/:id          ->  show
 * PUT     /api/companylookups/:id          ->  upsert
 * PATCH   /api/companylookups/:id          ->  patch
 * DELETE  /api/companylookups/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Companylookup from './companylookup.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Companylookups
export function index(req, res) {
  return Companylookup.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Companylookup from the DB
export function show(req, res) {
  return Companylookup.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Companylookup in the DB
export function create(req, res) {
  return Companylookup.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Companylookup in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Companylookup.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Companylookup in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Companylookup.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Companylookup from the DB
export function destroy(req, res) {
  return Companylookup.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
