'use strict';

describe('Freelance App Contrl', function(){
  var homeScope, jobScope, jobSingleScope, myJobsScope, profileScope, userScope, homeCtrl, jobCtrl, job_singleCtrl, myJobsCtrl, profileCtrl, userCtrl;
  beforeEach(module('freelanceApp'));

  beforeEach(inject(function($controller, $rootScope){
    homeScope = $rootScope.$new();
    homeCtrl = $controller('homeCtrl', {
      $scope: homeScope
    });
    jobScope = $rootScope.$new();
    jobCtrl = $controller('jobCtrl', {
      $scope: jobScope
    });
    jobSingleScope = $rootScope.$new();
    job_singleCtrl = $controller('job_singleCtrl', {
      $scope: jobSingleScope
    });
    myJobsScope = $rootScope.$new();
    myJobsCtrl = $controller('myJobsCtrl', {
      $scope: myJobsScope
    });
    profileScope = $rootScope.$new();
    profileCtrl = $controller('profileCtrl', {
      $scope: profileScope
    });
    userScope = $rootScope.$new();
    userCtrl = $controller('userCtrl', {
      $scope: userScope
    });
  }));

    it('Controllers should be defined', function() {
      expect(homeCtrl).toBeDefined();
      expect(jobCtrl).toBeDefined();
      expect(job_singleCtrl).toBeDefined();
      expect(myJobsCtrl).toBeDefined();
      expect(profileCtrl).toBeDefined();
      expect(userCtrl).toBeDefined();
    });

    describe('Home Ctrl', function(){
      it('should have navigation close', function(){
        var type = typeof homeScope.close;
        expect(type).toBe('function');
      });

      it('should have navigation toggle', function(){
        expect(homeScope.toggle).toBeDefined();
      });

      it('should have navigation toggle', function(){
        expect(homeScope.toggle).toBeDefined();
      });

      it('should have recent jobs of type array', function(){
        var type = typeof homeScope.recentJobs;
        expect(type).toBe('object');
      });

      it('should have recent jobs of type array', function(){
        var type = typeof homeScope.logout;
        expect(type).toBe('function');
      });
    });

    describe('Job Ctrl', function(){
      it('should have jobs of type array', function(){
         var type = typeof jobScope.jobs;
        expect(type).toBe('object');
      });
    });

    describe(' Single Job Ctrl', function(){
      it('should have jobs of type array', function(){
         var type = typeof jobSingleScope.single_job;
        expect(type).toBe('object');
      });
     it('should have apply for jobs of type function', function(){
        var type = typeof jobSingleScope.applyForJob;
        expect(type).toBe('function');
      });
      it('should have postComment of type function', function(){
        var type = typeof jobSingleScope.postComment;
        expect(type).toBe('function');
      });
      it('should expect hideProg to true', function(){
        expect(jobSingleScope.hideProg).toBe(true);
      });
    });

    describe('Posted Jobs Ctrl', function(){
      it('should have jobs of type array', function(){
         var type = typeof myJobsScope.userJobs;
        expect(type).toBe('object');
      });
     it('should have view jobs of type function', function(){
        var type = typeof myJobsScope.viewJob;
        expect(type).toBe('function');
      });
      it('should have deleteJob of type function', function(){
        var type = typeof myJobsScope.deleteJob;
        expect(type).toBe('function');
      });
      it('should expect hideProg to true', function(){
        expect(jobSingleScope.hideProg).toBe(true);
      });
    });

    describe('Profile Ctrl', function(){
      it('should have user profile of type array', function(){
         var type = typeof profileScope.profile;
        expect(type).toBe('object');
      });
     it('should have edit User of type function', function(){
        var type = typeof profileScope.editUser;
        expect(type).toBe('function');
      });
      it('should have PostJob of type function', function(){
        var type = typeof profileScope.postJob;
        expect(type).toBe('function');
      });
      it('should have DeleteUser of type function', function(){
        var type = typeof profileScope.deleteUser;
        expect(type).toBe('function');
      });
    });

     describe('User Ctrl', function(){
     it('should have signUp of type function', function(){
        var type = typeof userScope.signUp;
        expect(type).toBe('function');
      });
      it('should have Login of type function', function(){
        var type = typeof userScope.logIn;
        expect(type).toBe('function');
      });
      it('should expect hideProg to true', function(){
        expect(userScope.hideProg).toBe(true);
      });
      it('should expect hidemsg to true', function(){
        expect(userScope.hidemsg).toBe(true);
      });

    });
});


