var m = require('mithril')
var Auth = module.exports = {}

window.Auth = Auth

Auth.signIn = function(username, password){
  var data = {
    "username": username,
    "password": password
  }

  return m.request({
    method : 'POST',
    url: 'http://pet-shop.api.mks.io/signin',
    data: data,
    "content-type": "application/json"
  }).then(function(response){
    Auth.isSignedIn(true);
    Auth.token(response.apiToken)
  }, function(){
    Auth.isSignedIn(false);
  })
}

Auth.signUp = function(username, password){
  var data = {
    "username": username,
    "password": password
  }

  return m.request({
    method: 'POST',
    url: 'http://pet-shop.api.mks.io/signUp',
    data : data,
    "content-type": "application/json",
    unwrapSuccess: function(response) {
      Auth.signIn(username,password);
      return response;
    },
    unwrapError: function(response) {
      return response.error;
    }
  });
}

Auth.username = m.prop("");
Auth.password = m.prop("");
Auth.isSignedIn = m.prop(false);
Auth.token = m.prop(null);
