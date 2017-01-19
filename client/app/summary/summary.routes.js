'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('summary', {
      url: '/',
      template: '<summary></summary>'
    });
}
