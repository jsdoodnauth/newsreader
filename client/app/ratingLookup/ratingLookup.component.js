'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './ratingLookup.routes';

export class RatingLookupComponent {
  ratinglookupCollection = [];
  newRatingName = '';
  newRatingValue = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('ratinglookup');
    });
  }

  $onInit() {
    this.$http.get('/api/ratinglookups')
      .then(response => {
        this.ratinglookupCollection = response.data;
        this.socket.syncUpdates('ratinglookup', this.ratinglookupCollection);
      });
  }

  addRating() {
    console.log('addRating()');
    if(this.newRatingName) {
      this.$http.post('/api/ratinglookups', {
        name: this.newRatingName,
        rating: this.newRatingValue
      });
      this.newRatingName = '';
    }
  }
  
  deleteRating(rating) {
    this.$http.delete(`/api/ratinglookups/${rating._id}`);
  }
}

export default angular.module('newsReaderApp.ratingLookup', [uiRouter])
  .config(routes)
  .component('ratingLookup', {
    template: require('./ratingLookup.html'),
    controller: RatingLookupComponent,
    controllerAs: 'ratingLookupCtrl'
  })
  .name;
