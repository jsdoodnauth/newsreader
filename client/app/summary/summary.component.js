'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './summary.routes';

export class SummaryComponent {
  summaryCollection = [];

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('story');
    });
  }

  $onInit() {
    this.$http.get('/api/feedsummarys')
      .then(response => {
        this.summaryCollection = response.data;
        this.socket.syncUpdates('summary', this.summaryCollection);
      });
  }
}

export default angular.module('newsReaderApp.summary', [uiRouter])
  .config(routes)
  .component('summary', {
    template: require('./summary.html'),
    controller: SummaryComponent,
    controllerAs: 'summaryCtrl'
  })
  .name;
