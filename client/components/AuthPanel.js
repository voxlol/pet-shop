var m = require('mithril')
var Auth = require('../models/auth')

var AuthPanel = module.exports = {}

AuthPanel.controller = function(){
  var ctrl = this;

  ctrl.username = m.prop("");
  ctrl.password = m.prop("");

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
}

AuthPanel.view = function(ctrl){
  if (Auth.isSignedIn() === false){
    var signInButton = m('button', {type:'submit', onclick: ctrl.signIn}, "Sign In");
    var signUpButton = m('button', {type:'submit', onclick: ctrl.signUp}, "Sign Up");
  }else{
    var signInButton = null;
    var signUpButton = null;
    var signOutButton = m('button', {type:'submit', onclick: ctrl.signOut}, "Sign Out");
    var greeting = m('p', "Hi " + Auth.username() + '!');
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
    greeting
  ])

}
