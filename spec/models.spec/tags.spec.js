'use strict';

describe('tagSchema', function() {
    require('../test.config');

    var mongoose = require('mongoose');
    var Tag = mongoose.model('Tags');
    var tagSchemaObject = Tag.schema.paths;

    it('should have the commentschema to be defined', function() {
       expect(Tag).toBeDefined();
       expect(Tag.modelName).toBe('tags');
    });
    it('should have the 4 schemas + _id + _v', function() {
            var count = 0;
            for(var key in tagSchemaObject){
                if (tagSchemaObject.hasOwnProperty(key)) {
                    count++;
                }
            };
        expect(count).toEqual(5);
    });
    it('should have the validations', function() {
        var tagSchemaObject = Tag.schema.paths;
        expect(tagSchemaObject['name'].options.required).toBe('Name must be present');
    });
     it('should throw an error when data is not sufficient, name ', function() {
        Tag.create({}, function(err){
        expect(err).not.toBeNull();
        });
    });
});
