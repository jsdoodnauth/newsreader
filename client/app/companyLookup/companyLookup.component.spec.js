'use strict';

describe('Component: CompanyLookupComponent', function() {
  // load the controller's module
  beforeEach(module('newsReaderApp.companyLookup'));

  var CompanyLookupComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CompanyLookupComponent = $componentController('companyLookup', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
