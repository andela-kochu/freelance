'use strict';

describe('UserSchema', function() {
    require('../test.config');

    var mongoose = require('mongoose');
    var User = mongoose.model('Users');
    var newuser = {
        name: "Kingsley",
        emailAddress: 'chitech247@gmial.com'
        };

    it('should have the Userschema to be defined', function() {
       expect(User).toBeDefined();
       expect(User.modelName).toBe('users');
    });
    it('should have the 6 schemas + _id + _v', function() {
        var userSchemaObject = User.schema.paths;
            var count = 0;
            for(var key in userSchemaObject){
                if (userSchemaObject.hasOwnProperty(key)) {
                    count++;
                }
            };
        expect(count).toEqual(8);
    });
    it('should have the validations', function() {
        var userSchemaObject = User.schema.paths;
        expect(userSchemaObject['name'].options.required).toBe('Name must be present');
        expect(userSchemaObject['emailAddress'].options.required).toBe('Email address can not be empty');
    });
    /*  it('should create a new user', function() {
        User.create(newuser, function(err, info){
            if(err){
                expect(err).toBeDefined();
            }
        expect(info.name).toBe('Kingsley');
        expect(info.emailAddress).toBe('chitech247@gmial.com');
        });
    });*/
     it('should throw an error when data is not sufficient, name or emailAddress', function() {
        User.create({name: 'Kingsley'}, function(err, info){
        expect(err).toBeDefined();
        });
    });
});
