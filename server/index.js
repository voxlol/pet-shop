var Path = require('path')
var browserify = require('browserify-middleware')
var express = require('express')
var app = express()

//provide a browserified file at a path
var shared = ['mithril']
app.get('/scripts/vendor-bundle.js', browserify(shared))
app.get('/scripts/app-bundle.js', browserify('./client/main.js', { external: shared }))

// Sass
var sass = require('node-sass')
app.get('/styles/*', function(req, res) {
  var filePath = req.params[0]
  sass.render({
    file: Path.join(Path.join(__dirname, '../client'), filePath.replace(/\.css$/, '.scss') )
  }, function(err, result) {
    if (err) throw err;

    res.set('Content-Type', 'text/css')
    res.send(result.css)
  })
})

// Non-js static files
app.use(express.static('client/public'))

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
