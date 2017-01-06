'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('companyLookup', {
      url: '/companyLookup',
      template: '<company-lookup></company-lookup>'
    });
}
