'use strict';

describe('Component: RatingLookupComponent', function() {
  // load the controller's module
  beforeEach(module('newsReaderApp.ratingLookup'));

  var RatingLookupComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RatingLookupComponent = $componentController('ratingLookup', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
