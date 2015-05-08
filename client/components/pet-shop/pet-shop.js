(function () {

  window.PetShop = {}

  PetShop.controller = function () {
    var ctrl = this
    ctrl.shop = m.request({ method: 'GET', url: 'http://pet-shop.api.mks.io/shops/1' })
  }

  PetShop.view = function (ctrl) {
    return m('.pet-shop', [
      m('h1', "Welcome to " + ctrl.shop().name)
    ])
  }

})()
