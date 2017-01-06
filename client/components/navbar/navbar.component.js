'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  },
  {
    title: 'Ratings',
    state: 'ratingLookup'
  },
  {
    title: 'Company Identifier',
    state: 'companyLookup'
  },
  {
    title: 'Keyword Watch',
    state: 'keywordwatch'
  }];
  isCollapsed = true;

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
