'use strict';

describe('Component: SummaryComponent', function() {
  // load the controller's module
  beforeEach(module('newsReaderApp.summary'));

  var SummaryComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SummaryComponent = $componentController('summary', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
