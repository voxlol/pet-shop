var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this

  ctrl.username = m.prop("");
  ctrl.password = m.prop("");

  ctrl.isSignedIn = m.prop('false');

  ctrl.shop = m.prop(null)
  ctrl.pets = m.prop(null)
  Shop.fetch('http://pet-shop.api.mks.io/shops/1').then(ctrl.shop)
  Shop.fetch('http://pet-shop.api.mks.io/shops/1/pets').then(ctrl.pets)

  ctrl.signUp = function(e){
    e.preventDefault();
    var returnData = Shop.signUp(ctrl.username(), ctrl.password());
    if(returnData.error){
      // an error exists
    }else{
      // Probably want to sign in immediately right after signing up
    }

  }

  ctrl.signIn = function(e){
    e.preventDefault();
    var returnData = Shop.signIn(ctrl.username(), ctrl.password());
    if(returnData.error){
      // an error exists
    }else{
      // grab returnData's id, username under the user property
      // also can grab the token under the returnData.apiToken property
      // set the ctrl.isSignedIn property to true
    }

  }
}

PetShopWindow.view = function (ctrl) {

  return m('.pet-shop', [
    m('h1', "Welcome to " + ctrl.shop().name),

    //FORM
    m('form', [

      "User Name:  ",
      m('input', {
        type :"text",
        name: "username",
        oninput: m.withAttr("value", ctrl.username)
      }),

      " Password:  ",
      m('input', {
        type: "text",
        name: "password",
        oninput: m.withAttr("value", ctrl.password)
      }),

      //SUBMIT BUTTON
      m('button', {type: "submit", onclick: ctrl.signUp}, "Submit")
    ]),

        //FORM - ---------------- This code needs to be refactored
    m('form', [

      "User Name:  ",
      m('input', {
        type :"text",
        name: "username",
        oninput: m.withAttr("value", ctrl.username)
      }),

      " Password:  ",
      m('input', {
        type: "text",
        name: "password",
        oninput: m.withAttr("value", ctrl.password)
      }),

      //SUBMIT BUTTON
      m('button', {type: "submit", onclick: ctrl.signIn}, "Submit")
    ]),

    //partial application so petView has access to controller
    ctrl.pets().map( petView.bind(null, ctrl) )
  ])
}

function petView (ctrl, pet){
  // Make a button pop up if there's a signed in user
  return m('.pet', [
    m('p', 'Name : ' + pet.name),
    m('p', 'Species : ' + pet.species),
    m('img', {src: pet.imageUrl}),
    m('p', 'Likes : ', pet.likes.length)
  ])
}
