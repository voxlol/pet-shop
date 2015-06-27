var m = require('mithril')
var Shop = require('../models/shop')


var PetShopWindow = module.exports = {}

PetShopWindow.controller = function () {
  var ctrl = this

  ctrl.username = m.prop("");
  ctrl.password = m.prop("");
  ctrl.isSignedIn = m.prop(false);
  ctrl.token = m.prop(null);
  ctrl.shop = m.prop(null)
  ctrl.pets = m.prop(null)
  ctrl.requestData = m.prop(null);

  Shop.fetch('http://pet-shop.api.mks.io/shops/1').then(ctrl.shop)
  Shop.fetch('http://pet-shop.api.mks.io/shops/1/pets').then(ctrl.pets)

  setInterval(function() {
    Shop.fetch('http://pet-shop.api.mks.io/shops/1/pets')
    .then(ctrl.pets);
    console.log('hello there');
  }, 5000);

  ctrl.signUp = function(e){
    e.preventDefault();
    Shop.signUp(ctrl.username(), ctrl.password()).then(function(returnData){
      if (returnData.error){
        // an error exists
      } else {
        // Probably want to sign in immediately right after signing up
        Shop.signIn(ctrl.username(), ctrl.password());
      }

    });

  }

  ctrl.signIn = function(e){
    // debugger;
    e.preventDefault();
    Shop.signIn(ctrl.username(), ctrl.password()).then(function(returnData){
      if(returnData.error){
        // an error exists
        ctrl.isSignedIn(false);
      }else{
        // grab returnData's id, username under the user property
        ctrl.isSignedIn(true);
        ctrl.token(returnData.apiToken);
      }
    });
  }

  ctrl.signOut = function(e){
    e.preventDefault();
    ctrl.isSignedIn(false);
    ctrl.token(null);
  }

  ctrl.like = function(e,pet){
    // debugger;
    e.preventDefault();
    var data = {
      apiToken : ctrl.token()
    }

    return m.request({
      method: 'POST',
      url: 'http://pet-shop.api.mks.io/shops/1/pets/'+pet.id +'/like',
      data : data,
      "content-type" : "application/json",
      unwrapSuccess: function(response) {
        return response;
        // console.log("like sent!");
      },
      unwrapError: function(response) {
        return response.error;
        // console.log(response.error);
      }
    });
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

      //BUTTONS
      signInButton,
      signUpButton,
      signOutButton
    ]),

    ctrl.pets().map( petView.bind(null, ctrl) )
  ])
}

function petView (ctrl, pet){
  // check the isSignedIn property
  if (ctrl.isSignedIn()){
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
