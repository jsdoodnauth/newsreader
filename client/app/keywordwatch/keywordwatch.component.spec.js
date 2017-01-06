'use strict';

describe('Component: KeywordwatchComponent', function() {
  // load the controller's module
  beforeEach(module('newsReaderApp.keywordwatch'));

  var KeywordwatchComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    KeywordwatchComponent = $componentController('keywordwatch', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
