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
    // console.log('hello there');
    // console.log(Auth.isSignedIn());
    // console.log(Auth.token());
  }, 5000);

  ctrl.like = function(e,pet){
    e.preventDefault();
    var data = {
      apiToken : Auth.token()
    }

    return m.request({
      method: 'POST',
      url: 'http://pet-shop.api.mks.io/shops/1/pets/' + pet.id + '/like',
      data : data,
      "content-type" : "application/json",
      unwrapSuccess: function(response) {
        return response;
      },
      unwrapError: function(response) {
        return response.error;
      }
    });
  }
}

PetShopWindow.view = function (ctrl) {
  // if (ctrl.isSignedIn() === false){
  //   // return signedInView(ctrl)
  // }else{
  //   // return signedOutView(ctrl)
  // }

  return m('.pet-shop', [

    // m.component(AuthPanel),

    m('h1', "Welcome to " + ctrl.shop().name),
    // m.component(AuthPanel),

    ctrl.pets().map( petView.bind(null, ctrl) )
  ])
}

function petView (ctrl, pet){
  // check the isSignedIn property
  // debugger;
  // console.log("Signed in ?", Auth.isSignedIn())
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
    m('p', 'Likes : ', pet.likes.length)
  ])
}
