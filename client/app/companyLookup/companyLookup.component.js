'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './companyLookup.routes';

export class CompanyLookupComponent {
  companylookupCollection = [];
  companyName = '';
  companySymbol = '';
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('companylookup');
    });
  }

  $onInit() {
    this.$http.get('/api/companylookups')
      .then(response => {
        this.companylookupCollection = response.data;
        this.socket.syncUpdates('companylookup', this.companylookupCollection);
      });
  }

  addCompany() {
    console.log('addCompany()');
    if(this.companyName) {
      this.$http.post('/api/companylookups', {
        name: this.companyName,
        symbol: this.companySymbol
      });
      this.companyName = '';
      this.companySymbol = '';
    }
  }
  
  deleteCompany(company) {
    this.$http.delete(`/api/companylookups/${company._id}`);
  }
}

export default angular.module('newsReaderApp.companyLookup', [uiRouter])
  .config(routes)
  .component('companyLookup', {
    template: require('./companyLookup.html'),
    controller: CompanyLookupComponent,
    controllerAs: 'companyLookupCtrl'
  })
  .name;
