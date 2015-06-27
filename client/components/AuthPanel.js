var m = require('mithril')
var Auth = require('../models/auth')

var AuthPanel = module.exports = {}

AuthPanel.controller = function(){
  var ctrl = this;

  ctrl.setUsername = function(e){
    Auth.username(this.value);
  }

  ctrl.setPassword = function(e){
    Auth.password(this.value);
  }

  ctrl.signUp = function(e){
    e.preventDefault();
    Auth.signUp(Auth.username(), Auth.password())
  }

  ctrl.signIn = function(e){
    e.preventDefault();
    Auth.signIn(Auth.username(), Auth.password()).then(function(){
      console.log(Auth.isSignedIn());
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
    // return signedInView(ctrl)
    var signInButton = m('button', {type:'submit', onclick: ctrl.signIn}, "Sign In");
    var signUpButton = m('button', {type:'submit', onclick: ctrl.signUp}, "Sign Up");
  }else{
    // return signedOutView(ctrl)
    var signInButton = null;
    var signUpButton = null;
    var signOutButton = m('button', {type:'submit', onclick: ctrl.signOut}, "Sign Out");
  }

  //FORM
  return m('form', [

    "User Name:  ",
    m('input', {
      type :"text",
      name: "username",
      oninput: ctrl.setUsername
      // m.withAttr("value", ctrl.setUsername)
    }),

    " Password:  ",
    m('input', {
      type: "text",
      name: "password",
      oninput: ctrl.setPassword
      // m.withAttr("value", ctrl.setPassword)
    }),

    //BUTTONS
    signInButton,
    signUpButton,
    signOutButton
  ])
}
