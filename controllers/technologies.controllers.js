'use strict';

var mongoose = require('mongoose');
require('../models/technologies.models')
var Technology = mongoose.model('Technologies');

exports.createTechnology = function(req, res){
  Technology.create(req.body, function(err, technology){
    if(err){
      return res.json(err);
    }
    res.json(technology);
  });
};

exports.viewTechnologies = function(req, res){
  Technology.find(function(err, technologies){
    if(err){
      return res.json(err);
    }
    res.json(technologies);
  });
};
exports.updateTechnologies =function(req, res){
  Technology.update({
    _id: req.params.id
  }, req.body, function(err, tech){
    if(err){
      return res.json(err);
    }
    res.json(tech);
  });
};
exports.deleteTechnologies = function(req, res){
  Technology.remove(function(err, technologies){
    if(err){
      return res.json(err);
    }
    res.json(technologies);
  });
};
exports.deleteOneTechnology = function(req, res){
  Technology.remove({
    _id: req.params.id
  }, function(err, tech){
    if(err){
      return res.json(err);
    }
    res.json(tech);
  });
};
