var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this
  ctrl.shop = m.prop(null)
  ctrl.pets = m.prop(null)
  Shop.fetch('http://pet-shop.api.mks.io/shops/1').then(ctrl.shop)
  Shop.fetch('http://pet-shop.api.mks.io/shops/1/pets').then(ctrl.pets)
}

PetShopWindow.view = function (ctrl) {
  return m('.pet-shop', [
    m('h1', "Welcome to " + ctrl.shop().name),
    ctrl.pets().map(petView)
  ])

  function petView (pet){
    return m('.pet', [
      m('p', 'Name : ' + pet.name),
      m('p', 'Species : ' + pet.species),
      m('img', {src: pet.imageUrl}),
      m('p', 'Likes : ', pet.likes.length)
    ])
  }
}

