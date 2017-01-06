import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  storyCollection = [];
  newStory = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('story');
    });
  }

  $onInit() {
    this.$http.get('/api/processors')
      .then(response => {
        this.storyCollection = response.data;
        this.socket.syncUpdates('story', this.storyCollection);
      });
  }

  addThing() {
    if(this.newStory) {
      this.$http.post('/api/processors', {
        name: this.newStory
      });
      this.newStory = '';
    }
  }

// CAN BE USED TO DISMISS A STORY 
// OR TAG AS IMPORTANT
  deleteThing(story) {
    this.$http.delete(`/api/processors/${story._id}`);
  }
}

export default angular.module('newsReaderApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
