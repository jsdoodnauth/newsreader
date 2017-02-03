'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routes from './summary.routes';
import moment from 'moment';

var storyCollection = [];
export class SummaryComponent {
  summaryCollection = [];
  filterCollection = [];
  filterTitle = "Stories";

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('summary');
      socket.unsyncUpdates('story');
      socket.unsyncUpdates('filter');
    });
  }

  $onInit() {
    this.$http.get('/api/feedsummarys')
      .then(response => {
        this.summaryCollection = response.data;
        this.socket.syncUpdates('summary', this.summaryCollection);
      });
    this.$http.get('/api/processors')
      .then(response => {
        storyCollection = response.data;
        this.socket.syncUpdates('story', storyCollection);
      });
  }

  getStoriesByBuySell(item) {
    var coll = storyCollection;
    var filterCollection = [];
    
    for (var i=0; i<coll.length; i++) {
      if (coll[i].position == item.name) {
        filterCollection.push(coll[i]);
      }
    }
    this.filterTitle = "Stories by " + item.name;
    this.filterCollection = filterCollection;
    this.socket.syncUpdates('filter', this.filterCollection);
  }

  getStoriesByCompany(item) {
    var coll = storyCollection;
    var filterCollection = [];
    
    for (var i=0; i<coll.length; i++) {
      if (coll[i].companies == item.name) {
        filterCollection.push(coll[i]);
      }
    }
    this.filterTitle = "Stories by Company - " + item.name;
    this.filterCollection = filterCollection;
    this.socket.syncUpdates('filter', this.filterCollection);
  }

  getStoriesByKeyword(item) {
    var coll = storyCollection;
    var filterCollection = [];
    
    for (var i=0; i<coll.length; i++) {
      if (coll[i].keywords == item.name) {
        filterCollection.push(coll[i]);
      }
    }
    this.filterTitle = "Stories by Keyword - " + item.name;
    this.filterCollection = filterCollection;
    this.socket.syncUpdates('filter', this.filterCollection);
  }

  getFuzzyDate(date) {
    return moment(date).fromNow();
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
