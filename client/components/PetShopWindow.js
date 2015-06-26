var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this

  ctrl.username = m.prop("");
  ctrl.password = m.prop("");
  ctrl.isSignedIn = m.prop(false);

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
      Shop.signIn(ctrl.username(), ctrl.password());
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
      ctrl.isSignedIn = m.prop(true);
    }
  }

  ctrl.signOut = function(e){
    e.preventDefault();
    ctrl.isSignedIn(false);
  }
}

PetShopWindow.view = function (ctrl) {

  // Base case : 2 sign in / sign up
  if (ctrl.isSignedIn() === false){
    var signInButton = m('button', {type:'submit', onclick: ctrl.signIn}, "Sign In");
    var signUpButton = m('button', {type:'submit', onclick: ctrl.signUp}, "Sign Up");
  }else{
    var signInButton = null;
    var signUpButton = null;
    //functionality pending
    var signOutButton = m('button', {type:'submit', onclick: ctrl.signOut}, "Sign Out");
  }

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
      // m('button', {type: "submit", onclick: ctrl.signUp}, "Submit")
      signInButton,
      signUpButton,
      signOutButton
    ]),

    //     //FORM - ---------------- This code needs to be refactored
    // m('form', [

    //   "User Name:  ",
    //   m('input', {
    //     type :"text",
    //     name: "username",
    //     oninput: m.withAttr("value", ctrl.username)
    //   }),

    //   " Password:  ",
    //   m('input', {
    //     type: "text",
    //     name: "password",
    //     oninput: m.withAttr("value", ctrl.password)
    //   }),

    //   //SUBMIT BUTTON
    //   m('button', {type: "submit", onclick: ctrl.signIn}, "Submit")
    // ]),

    //partial application so petView has access to controller
    ctrl.pets().map( petView.bind(null, ctrl) )
  ])
}

function petView (ctrl, pet){
  // check the isSignedIn property
  // var likedButton = isSignedIn ? likedButton element : ""

  return m('.pet', [
    m('p', 'Name : ' + pet.name),
    m('p', 'Species : ' + pet.species),
    m('img', {src: pet.imageUrl}),
    m('p', 'Likes : ', pet.likes.length)
  ])
}
