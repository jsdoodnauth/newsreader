'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('keywordwatch', {
      url: '/keywordwatch',
      template: '<keywordwatch></keywordwatch>'
    });
}
