'use strict';

describe('UserSchema', function() {
    require('../test.config');

    var mongoose = require('mongoose');
    var User = mongoose.model('users');
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
    it('should create a new user', function() {
        User.create(newuser, function(err, user){
        expect(err).not.toBeDefined();
        expect(user.name).toBe('Kingsley');
        expect(user.emailAddress).toBe('chitech247@gmial.com');
        });
    });
     it('should throw an error when data is not sufficient, name or emailAddress', function() {
        User.create({name: 'Kingsley'}, function(err){
        expect(err).toBeNull();
        });
    });
   it('should find users', function() {
        User.find(function(err, user){
        expect(err).not.toBeNull();
        var type = typeof user;
        expect(type).toEqual('object');
        expect(user.length).toBeGreaterThan(0);
        });
    });
    it('should update users', function() {
        User.find(function(err, user){
         var id = user[1]._id;
            User.update({_id: id}, {name: "george"}, function(){
                User.find({_id: id}, function(err, updatedUser){
                    expect(updatedUser[0].name).toEqual('george');
                });
             });
        });
    });
    it('should delete the first user', function() {
        User.find(function(err, user){
         var id = user[1]._id;
            User.remove({_id: id}, function(){
                User.find(function(err, usersFound){
                    usersFound.forEach(function(elem){
                        expect(elem._id).not.toBe(id);
                    });
                });
             });
        });
    });
});
