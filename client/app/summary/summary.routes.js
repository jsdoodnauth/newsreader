'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('summary', {
      url: '/summary',
      template: '<summary></summary>'
    });
}
