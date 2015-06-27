var m = require('mithril')
var Shop = require('../models/shop')
var Auth = require('../models/auth')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this

  ctrl.shop = m.prop(null)
  ctrl.pets = m.prop(null)

  Shop.fetch().then(ctrl.shop)
  Shop.fetchPets().then(ctrl.pets)

  setInterval(function() {
    Shop.fetchPets()
    .then(ctrl.pets);
  }, 5000);

  ctrl.like = function(e,pet){
    e.preventDefault();
    var data = {
      apiToken : Auth.token()
    }

    Shop.like(pet.id, data);
  }
}

PetShopWindow.view = function (ctrl) {

  return m('.pet-shop', [
    m('h1', "Welcome to " + ctrl.shop().name),
    ctrl.pets().map( petView.bind(null, ctrl) )
  ])
}

function petView (ctrl, pet){
  if (Auth.isSignedIn()) {
    var likedButton = m('button', {type:'submit', onclick: function(e){
      ctrl.like(e,pet)
    }}, "Like");
  }

  return m('.pet', [
    m('p', 'Name : ' + pet.name),
    m('p', 'Species : ' + pet.species),
    m('img', {src: pet.imageUrl}),
    likedButton,
    m('span', 'Likes : ', pet.likes.length)
  ])
}
