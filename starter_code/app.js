
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname+"/views/partials");

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    res.render('beers', {beersList: beers})

  })
  .catch(error => {
    console.log(error)
  })

});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random-beers', {beersList: beers})
  })
  .catch(error => {
    console.log(error)
  })
  
});

// app.get('/beers', (req, res) => {
//   punkAPI.getBeers().then(beers => {
//     console.log(beers)
//     res.render("beers", ????)
//   })
//     .catch(error => {
//       console.log(error)
//     })
// });



app.listen(3000);
