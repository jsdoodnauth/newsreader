'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/articles',
    template: '<main></main>'
  });
}
