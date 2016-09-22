'use strict';
var jwt = require('jsonwebtoken');
var knex = require('../db/knex');
var hash = require('./hash');
var bcrypt = require('bcrypt');

function addUser(req, res, next) {
  console.log(req.body);
    hash(req.body.password)
        .then(function(result) {
          console.log('here?? inner hash');
            return knex('users').insert({
                u_name: req.body.u_name,
                password: result,
                serial_id: "1234qqq",
                ip: req.body.ip
            });
        })
        .then(function(data) {
          console.log(data[0]);
          var profile= {
            u_name: data[0].username,
            ip: data[0].ip
        };
          var token = jwt.sign(profile, process.env.SECRET, {expiresIn: 432000});
          res.status(200).json({
              token: token
          });
            res.send(data);
        })
        .catch(function(err) {
          console.log('err!', err);
            res.send(err);
        });
}

function checklogin (req, res, next){
  console.log(req.body);
  knex('users')
  .where('u_name',req.body.u_name)
  .then(function(data){
    bcrypt.compare(req.body.password, data[0].password, function(err, result){
      if(result){
        var profile= {
          u_name: data[0].username,
          ip: data[0].ip
      };
      var token =jwt.sign(profile, process.env.SECRET);
      res.status(200).json({
        token:token,
        profile:profile
        });
      }
      else {
        console.log("boo");
      }
    });
  })
  .catch(function(err){
    console.log(err);
  });
}




module.exports = {
    addUser: addUser,
    checklogin: checklogin
};
