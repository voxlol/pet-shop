var m = require('mithril')
var Auth = require('../models/auth')
var Shop = require('../models/shop')

var AuthPanel = module.exports = {}

AuthPanel.controller = function(){
  var ctrl = this;

  ctrl.username = m.prop("");
  ctrl.password = m.prop("");

  ctrl.petName = m.prop('');
  ctrl.petSpecies = m.prop('');
  ctrl.petUrl = m.prop('');

  ctrl.signUp = function(e){
    e.preventDefault();
    Auth.signUp(ctrl.username(), ctrl.password()).then(function(){
      ctrl.username('');
      ctrl.password('');
    })
  }

  ctrl.signIn = function(e){
    e.preventDefault();
    Auth.signIn(ctrl.username(), ctrl.password()).then(function(){
      ctrl.username("");
      ctrl.password("");
    })
  }

  ctrl.signOut = function(e){
    e.preventDefault();
    Auth.isSignedIn(false);
    Auth.token(null);
  }

  ctrl.petSubmit = function(e){
    e.preventDefault();
    Shop.addPet(ctrl.petName(), ctrl.petSpecies(), ctrl.petUrl()).then(function(){
      ctrl.petName('');
      ctrl.petSpecies('');
      ctrl.petUrl('');
      alert("Thank you for your submission!");
    });
  }
}

AuthPanel.view = function(ctrl){
  if (Auth.isSignedIn() === false){
    var signInButton = m('button', {type:'submit', onclick: ctrl.signIn}, "Sign In");
    var signUpButton = m('button', {type:'submit', onclick: ctrl.signUp}, "Sign Up");
    var createPetForm = null;
  }else{
    var signInButton = null;
    var signUpButton = null;
    var signOutButton = m('button', {type:'submit', onclick: ctrl.signOut}, "Sign Out");
    var greeting = m('p', "Hi " + Auth.username() + '!');
    var createPetForm = m('form', [
      "Pet Name:  ",
      m('input', {
        type :"text",
        name: "name",
        value: ctrl.petName(),
        oninput: m.withAttr("value", ctrl.petName)
      }),
      m('br'),

      "Species:  ",
      m('input', {
        type: "text",
        name: "species",
        value: ctrl.petSpecies(),
        oninput: m.withAttr("value", ctrl.petSpecies)
      }),
      m('br'),

      "Image URL:  ",
      m('input', {
        type: "text",
        name: "imageUrl",
        value: ctrl.petUrl(),
        oninput: m.withAttr("value", ctrl.petUrl)
      }),
      m('br'),

      m('button', {type:'submit', onclick: ctrl.petSubmit}, "Create a pet!")
    ])
  }

  //FORM
  return m('form', [

    "User Name:  ",
    m('input', {
      type :"text",
      name: "username",
      value: ctrl.username(),
      oninput: m.withAttr("value", ctrl.username)
    }),

    " Password:  ",
    m('input', {
      type: "text",
      name: "password",
      value: ctrl.password(),
      oninput: m.withAttr("value", ctrl.password)
    }),

    //BUTTONS
    signInButton,
    signUpButton,
    signOutButton,
    greeting,
    createPetForm
  ])

}
