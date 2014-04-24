// Generated by LiveScript 1.2.0
(function(){
  var request, PBClient;
  request = require('request');
  module.exports = PBClient = (function(){
    PBClient.displayName = 'PBClient';
    var prototype = PBClient.prototype, constructor = PBClient;
    function PBClient(hostname, username, password){
      this.hostname = hostname;
      this.username = username;
      this.password = password;
      this.request = request.defaults({
        jar: true,
        strictSSL: false
      });
    }
    prototype.R = function(path){
      return this.hostname + "" + path;
    };
    prototype.user = function(cb){
      var this$ = this;
      return this.request.get(this.R('/auth/user'), function(err, res, body){
        var u, e;
        if (err) {
          return cb(err);
        }
        try {
          u = JSON.parse(body);
          return cb(null, u);
        } catch (e$) {
          e = e$;
          return cb(e);
        }
      });
    };
    prototype.login = function(cb){
      var this$ = this;
      return this.request.post(this.R('/auth/login'), {
        form: {
          username: this.username,
          password: this.password
        }
      }, function(err, res, body){
        var r, e;
        if (err) {
          return cb(err);
        }
        try {
          r = JSON.parse(body);
          if (r.success) {
            return this$.user(function(err, u){
              if (err) {
                return cb(err);
              }
              this$.u = u;
              return cb(null, u);
            });
          }
        } catch (e$) {
          e = e$;
          return cb(e);
        }
      });
    };
    prototype.logout = function(cb){
      return this.request.get(this.R('/auth/logout'), cb);
    };
    prototype.createThread = function(forum_id, title, body, cb){
      var this$ = this;
      return this.request.post(this.R('/resources/posts'), {
        form: {
          forum_id: forum_id,
          title: title,
          body: body
        }
      }, function(err, res, body){
        var r, e;
        if (err) {
          return cb(err);
        }
        try {
          r = JSON.parse(body);
          return cb(null, r);
        } catch (e$) {
          e = e$;
          return cb(e);
        }
      });
    };
    prototype.post = function(forum_id, parent_id, body, cb){
      var this$ = this;
      return this.request.post(this.R('/resources/posts'), {
        form: {
          forum_id: forum_id,
          parent_id: parent_id,
          body: body
        }
      }, function(err, res, body){
        var r, e;
        if (err) {
          return cb(err);
        }
        try {
          r = JSON.parse(body);
          return cb(null, r);
        } catch (e$) {
          e = e$;
          return cb(e);
        }
      });
    };
    prototype.createPost = function(path, title, body, cb){
      var this$ = this;
      console.log(this.R(path) + "?_surf=1");
      return this.request.get(this.R(path) + "?_surf=1", function(err, res, surfBody){
        var r, locals, e;
        if (err) {
          return cb(err);
        }
        try {
          r = JSON.parse(surfBody);
          locals = r.locals;
          console.log(locals.type);
          if (locals.type === 'forum') {
            this$.createThread(locals.forum.id, title, body, cb);
          } else {
            this$.post(locals.forum.id, locals.thread.id, body, cb);
          }
        } catch (e$) {
          e = e$;
          return cb(e);
        }
      });
    };
    return PBClient;
  }());
}).call(this);
