var m = require('mithril')


var Shop = module.exports = {}

Shop.fetch = function (url) {
  return m.request({
    method: 'GET',
    url: url
  })
}

