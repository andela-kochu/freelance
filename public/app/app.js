'use strict';

angular.module('freelanceApp', ['ngMaterial',
    'ui.router',
    'ngStorage',
    'ngAnimate',
    'ngAria',
    'ngMessages'
]);

angular.module('freelanceApp').config([
    '$stateProvider',
    '$urlRouterProvider', 
    '$httpProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/partials/home.view.html',
                controller: 'homeCtrl',
                resolve: {
                    recentJobsPromise: ['JobService', function(JobService) {
                        return JobService.getAll();
                    }]
                }
            })
            .state('jobs', {
                url: '/jobs',
                templateUrl: 'app/partials/job.view.html',
                controller: 'jobCtrl',
                resolve: {
                    jobPromise: ['JobService', function(JobService) {
                        return JobService.getAll();
                    }]
                }
            })
            .state('jobs-single', {
                url: '/jobs/:slug',
                templateUrl: 'app/partials/job-single.view.html',
                controller: 'job_singleCtrl',
                resolve: {
                    singleJobPromise: ['$stateParams', 'JobService', function($stateParams, JobService) {
                        return JobService.getSingle($stateParams.slug);
                    }]
                }
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/partials/signin.view.html',
                controller: 'userCtrl'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/partials/admin.signin.view.html',
                controller: 'userCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/partials/signup.view.html',
                controller: 'userCtrl'
            })
            .state('postedjobs', {
                url: '/profile/myjobs',
                templateUrl: 'app/partials/view.post.job.html',
                controller: 'myJobsCtrl',
                resolve: {
                    postJobsPromise: ['JobService', function(JobService) {
                        return JobService.getUserJob();
                    }]
                }
            })
            .state('appliedJobs', {
                url: '/profile/jobs/applied',
                templateUrl: 'app/partials/view.applied.job.html',
                controller: 'appliedCtrl',
                resolve: {
                    postJobsPromise: ['UserService', function(UserService) {
                        return UserService.profile();
                    }]
                }
            })
            .state('allpostedjobs', {
                url: '/admin-profile/all-jobs',
                templateUrl: 'app/partials/admin.view.post.job.html',
                controller: 'allJobsCtrl',
                resolve: {
                    postJobsPromise: ['JobService', function(JobService) {
                        return JobService.getAll();
                    }]
                }
            })
            .state('allUsers', {
                url: '/admin-profile/all-users',
                templateUrl: 'app/partials/admin.view.users.html',
                controller: 'allUsersCtrl',
                resolve: {
                    postJobsPromise: ['UserService', function(UserService) {
                        return UserService.getAll();
                    }]
                }
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/partials/profile.view.html',
                controller: 'profileCtrl',
                resolve: {
                    profilePromise: ['UserService', function(UserService) {
                        return UserService.profile();
                    }]
                }
            })
            .state('admin-profile', {
                url: '/admin-profile',
                templateUrl: 'app/partials/admin.profile.view.html',
                controller: 'adminProfileCtrl',
                resolve: {
                    profilePromise: ['UserService', function(UserService) {
                        return UserService.profile();
                    }]
                }
            });
        $urlRouterProvider.otherwise('/');

        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$window', '$timeout', '$rootScope',
            function($q, $location, $localStorage, $window, $timeout, $rootScope) {
                return {
                    'request': function(config) {
                        var querytoken = $location.search().token;
                        var queryUser = $location.search().user;
                        $location.search('token', null);
                        $location.search('user', null);
                        if (!$window.sessionStorage.token && querytoken) {
                            $window.sessionStorage.token = querytoken;
                            $window.sessionStorage.user = queryUser;
                        }
                        if ($window.sessionStorage.token || querytoken) {
                            config.headers.Authorization = $window.sessionStorage.token || querytoken;
                        }
                        return config;
                    },

                    // optional method
                    'response': function(response) {
                        return response;
                    },

                    'requestError': function(rejection) {
                        console.log('request error');
                        if (rejection.status === 401 || rejection.status === 403) {
                            // ToastService.showToast('You have to signin/Signup first');
                            $window.location.href = '#/signin';
                        }
                        return $q.reject(rejection);
                    },
                    'responseError': function(rejection) {
                        console.log('response error', rejection)
                        if (rejection.status === 401 || rejection.status === 403) {
                            $window.location.href = '#/signin';
                        }
                        return $q.reject(rejection);
                    }
                };
            }
        ]);
    }
]);
