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
    // console.log(response);
      Auth.isSignedIn(true);
      Auth.token(response.apiToken)
      Auth.username(response.user.username);
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
  }).then(function(){
    Auth.signIn(username,password);
  });
}

Auth.isSignedIn = m.prop(false);
Auth.token = m.prop(null);
Auth.username = m.prop(null);
