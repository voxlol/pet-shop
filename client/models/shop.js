var m = require('mithril')

var Shop = module.exports = {}

Shop.fetch = function () {
  return m.request({
    method: 'GET',
    url: 'http://pet-shop.api.mks.io/shops/1'
  })
}

Shop.fetchPets = function () {
  return m.request({
    method: 'GET',
    url: 'http://pet-shop.api.mks.io/shops/1/pets'
  })
}

Shop.like = function(petid, data){
  return m.request({
    method: 'POST',
    url: 'http://pet-shop.api.mks.io/shops/1/pets/' + petid + '/like',
    data : data,
    "content-type" : "application/json"
  });
}
