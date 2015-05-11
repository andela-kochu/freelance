'use strict';

describe('JobSchema', function() {
    require('../test.config');

    var mongoose = require('mongoose');
    var Job = mongoose.model('Jobs');

    it('should have the Jobschema to be defined', function() {
       expect(Job).toBeDefined();
       expect(Job.modelName).toBe('Jobs');
    });
    it('should have the 4 schemas + _id + _v', function() {
        var jobSchemaObject = Job.schema.paths;
         //console.log(jobSchemaObject)
            var count = 0;
            for(var key in jobSchemaObject){
                if (jobSchemaObject.hasOwnProperty(key)) {
                    count++;
                }
            };
        expect(count).toEqual(6);
    });
    it('should have the validations', function() {
        var jobSchemaObject = Job.schema.paths;
        expect(jobSchemaObject['name'].options.required).toBe('Name must be present');
    });
     it('should throw an error when data is not sufficient, name or slug', function() {
        Job.create({name: 'New Job'}, function(err){
        expect(err).not.toBeNull();
        });
    });
});
