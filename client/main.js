// Require language extensions BEFORE anything else
require('../ext')
var m = require('mithril')


var PetShopWindow = require('./components/PetShopWindow')
var AuthPanel = require('./components/AuthPanel')

m.mount(document.getElementById('app'), {
  view: function () {
    return m('#app', [
      m.component(AuthPanel),
      m.component(PetShopWindow)
    ])
  }
})
