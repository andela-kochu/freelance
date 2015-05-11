'use strict';

describe('DevSchema', function() {
    require('../test.config');

    var mongoose = require('mongoose');
    var Developer = mongoose.model('Developers');

    it('should have the Userschema to be defined', function() {
       expect(Developer).toBeDefined();
       expect(Developer.modelName).toBe('Developers');
    });
    it('should have the 6 schemas + _id + _v', function() {
        var developerSchemaObject = Developer.schema.paths;
            var count = 0;
            for(var key in developerSchemaObject){
                if (developerSchemaObject.hasOwnProperty(key)) {
                    count++;
                }
            };
        expect(count).toEqual(12);
    });
    it('should have the validations', function() {
        var developerSchemaObject = Developer.schema.paths;
        expect(developerSchemaObject['name'].options.required).toBe('Name must be present');
        expect(developerSchemaObject['emailAddress'].options.required).toBe('Email address can not be empty');
        expect(developerSchemaObject['skills'].options.required).toBe("Developer must have skills");
    });
     it('should throw an error when data is not sufficient, name or emailAddress', function() {
        Developer.create({name: 'Kingsley'}, function(err){
        expect(err).not.toBeNull();
        });
    });
});
