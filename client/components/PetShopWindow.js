var m = require('mithril')
var Shop = require('../models/shop')
var Auth = require('../models/auth')

var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this

  ctrl.shop = m.prop(null)
  ctrl.pets = m.prop(null)
  ctrl.sortPets = m.prop(false)

  Shop.fetch().then(ctrl.shop)
  Shop.fetchPets().then(ctrl.pets)

  setInterval(function() {
    Shop.fetchPets()
    .then(ctrl.pets).then(function(){
      if(ctrl.sortPets())
        ctrl.pets().sort(sortFunction)
    });

  }, 5000);


  ctrl.like = function(e,petId){
    // e.preventDefault();
    var data = {
      apiToken : Auth.token()
    }

    Shop.like(petId, data);
  }

  ctrl.sort = function(){
    ctrl.pets().sort(sortFunction);
    ctrl.sortPets(true);
  }

  function sortFunction(petA,petB){
    if(petA.likes.length > petB.likes.length)
      return -1
    else if(petA.likes.length < petB.likes.length)
      return 1
    else
      return 0
  }
}


PetShopWindow.view = function (ctrl) {
  return m('.pet-shop', [

    m('button', {onclick: ctrl.sort}, "Who is the best?"),
    m('h1', "Welcome to " + ctrl.shop().name),
    ctrl.pets().map( petView.bind(null, ctrl) ),
  ])
}

function petView (ctrl, pet){
  if (Auth.isSignedIn()) {
    var likedButton = m('button', {type:'submit', onclick: function(e){
      ctrl.like(e,pet.id)
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
