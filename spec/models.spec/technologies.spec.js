'use strict';

describe('TechSchema', function() {
    require('../test.config');

    var mongoose = require('mongoose');
    var Technology = mongoose.model('technologies');

    it('should have the Technology to be defined', function() {
       expect(Technology).toBeDefined();
       expect(Technology.modelName).toBe('technologies');
    });
    it('should have the 6 schemas + _id + _v', function() {
        var technologySchemaObject = Technology.schema.paths;
            var count = 0;
            for(var key in technologySchemaObject){
                if (technologySchemaObject.hasOwnProperty(key)) {
                    count++;
                }
            };
        expect(count).toEqual(5);
    });
    it('should have the validations', function() {
        var technologySchemaObject = Technology.schema.paths;
        expect(technologySchemaObject['name'].options.required).toBe('Name must be present');
    });
     it('should throw an error when data is not sufficient, name or emailAddress', function() {
        Technology.create({name: 'Kingsley'}, function(err, info){
        expect(err).toBeDefined();
        });
    });
});
