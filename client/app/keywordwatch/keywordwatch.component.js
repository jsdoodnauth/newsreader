'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './keywordwatch.routes';

export class KeywordwatchComponent {
  keywordCollection = [];
  keywordName = '';
  keywordCategory = '';
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('keyword');
    });
  }

  $onInit() {
    this.$http.get('/api/keywords')
      .then(response => {
        this.keywordCollection = response.data;
        this.socket.syncUpdates('keyword', this.keywordCollection);
      });
  }

  addKeyword() {
    console.log('addKeyword()');
    if(this.keywordName) {
      this.$http.post('/api/keywords', {
        name: this.keywordName,
        category: this.keywordCategory
      });
      this.keywordName = '';
      this.keywordCategory = '';
    }
  }
  
  deleteKeyword(keyword) {
    this.$http.delete(`/api/keywords/${keyword._id}`);
  }
}

export default angular.module('newsReaderApp.keywordwatch', [uiRouter])
  .config(routes)
  .component('keywordwatch', {
    template: require('./keywordwatch.html'),
    controller: KeywordwatchComponent,
    controllerAs: 'keywordwatchCtrl'
  })
  .name;
