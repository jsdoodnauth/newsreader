'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('ratingLookup', {
      url: '/ratingLookup',
      template: '<rating-lookup></rating-lookup>'
    });
}
