'use strict';

describe('commentSchema', function() {
    require('../test.config');

    var mongoose = require('mongoose');
    var Comment = mongoose.model('comments');
    var commentSchemaObject = Comment.schema.paths;
    it('should have the commentschema to be defined', function() {
       expect(Comment).toBeDefined();
       expect(Comment.modelName).toBe('comments');
    });
    it('should have the 4 schemas + _id + _v', function() {
            var count = 0;
            for(var key in commentSchemaObject){
                if (commentSchemaObject.hasOwnProperty(key)) {
                    count++;
                }
            };
        expect(count).toEqual(6);
    });
    it('should have the validations', function() {
        var commentSchemaObject = Comment.schema.paths;
        expect(commentSchemaObject['title'].options.required).toBe('Name must be present');
    });
     it('should throw an error when data is not sufficient, name ', function() {
        Comment.create({}, function(err){
        expect(err).not.toBeNull();
        });
    });
});
