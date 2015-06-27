var m = require('mithril')


var Shop = module.exports = {}

Shop.fetch = function (url) {
  return m.request({
    method: 'GET',
    url: url
  })
}

Shop.signIn = function(username, password){
  var data = {
    "username": username,
    "password": password
  }

  return m.request({
    method : 'POST',
    url: 'http://pet-shop.api.mks.io/signin',
    data: data,
    "content-type": "application/json",
    unwrapSuccess: function(response) {
      console.log("it worked!");
      return response;

    },
    unwrapError: function(response) {
      return response.error;
    }
  })
}

Shop.signUp = function(username, password){
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
      return response;
    },
    unwrapError: function(response) {
      return response.error;
    }
  });
}
