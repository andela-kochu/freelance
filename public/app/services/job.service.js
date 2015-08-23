'use strict';

angular.module('freelanceApp')
  .factory('JobService', ['$http', 'baseUrl', function($http, baseUrl) {
    var jobObject = {
      jobs: [],
      userJobs: [],
      singleJob: []
    };

    jobObject.getAll = function(){
      return $http.get(baseUrl + "/jobs").then(function(res){
        angular.copy(res.data, jobObject.jobs);
      });
    };

    jobObject.getSingle = function(slug){
      return $http.get(baseUrl + "/jobs/" + slug).then(function(res){
        angular.copy(res.data, jobObject.singleJob);
      });
    };

    jobObject.editSingle = function(slug, data){
      return $http.put(baseUrl + "/jobs/" + slug, data).then(function(res){
        return res.data;
      });
    };

    jobObject.applyFor = function(slug){
      return $http.put(baseUrl + "/jobs/" + slug + '/apply').then(function(res){
        return res.data;
      });
    };

    jobObject.postComment = function(comment){
      return $http.post(baseUrl + "/comments", comment).then(function(res){
         angular.copy(res.data, jobObject.singleJob);
      });
    };

    jobObject.deleteSingle = function(slug){
      return $http.delete(baseUrl + "/jobs/" + slug).then(function(res){
        return res.data;
      });
    };

    jobObject.postJob = function(data){
      return $http.post(baseUrl + "/jobs/", data).then(function(res){
        return res.data;
      });
    };

    jobObject.getUserJob = function(){
      return $http.get(baseUrl + "/user/jobs/").then(function(res){
       angular.copy(res.data, jobObject.userJobs);
      });
    };

    return jobObject;

}]);

