'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';

// import ngMessages from 'angular-messages';


import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import ratingLookup from './ratingLookup/ratingLookup.component';
import companyLookup from './companyLookup/companyLookup.component';
import keywordwatch from './keywordwatch/keywordwatch.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.css';

angular.module('newsReaderApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
  navbar, footer, main, constants, socket, util, ratingLookup, companyLookup, keywordwatch
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['newsReaderApp'], {
      strictDi: true
    });
  });
