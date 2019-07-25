var express = require("express");

var path = require("path");

var app = express();
var bodyParser = require('body-parser');
const server = app.listen(1337);

app.use(express.static(__dirname + '/public/dist/public'));


var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.connect('mongodb://localhost/stewbie');


//skyscanner api
// var unirest = require('unirest');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  limit: '5mb'
}));

var ReviewSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please enter a review"],
    minlength: [3, "Content must be at least 3 characters long"]
  },
  rating: {
    type: Number,
    required: [true, "Please select a rating"]
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: [3, "Name must be at least 3 characters long"]
  }
}, {
  timestamps: true
});
const Review = mongoose.model('Review', ReviewSchema);

var RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must enter a restaurant"],
    minlength: [3, "Name must be longer than 3 characters"],
    unique: true
  },
  cuisine: {
    type: String,
    required: [true, "Must enter a cuisine type"],
    minlength: [3, "Cuisine must be longer than 3 characters"]
  },
  reviews: [ReviewSchema]
}, {
  timestamps: true
})
mongoose.model('Restaurant', RestaurantSchema);
var Restaurant = mongoose.model('Restaurant');
RestaurantSchema.plugin(uniqueValidator);




var SabreDevStudio = require('sabre-dev-studio');
var sabre_dev_studio = new SabreDevStudio({
  client_id:     'V1:k2q2wdgj6ccgvg1o:DEVCENTER:EXT',
  client_secret: '0o1IjbTO',
  uri:           'https://api.test.sabre.com'
});
var options = {};
var callback = function(error, data) {
  if (error) {
    console.log("I am a pretty pretty error")
    console.log(error);
  } else {
    console.log("I am a pretty pretty success message")
    console.log(JSON.stringify(JSON.parse(data)));
  }
};

app.get('/sabredata', (req,res) =>  {
  sabre_dev_studio.get('/v2/shop/flights/fares?origin=SFO&lengthofstay=3%2C6%2C8&earliestdeparturedate=2019-07-29&latestdeparturedate=2019-08-03&location=ES%2CMX&minfare=250&maxfare=550&pointofsalecountry=US&topdestinations=5&pricepermile=0.15', options, callback);
  return sabre_dev_studio.get('/v1/lists/supported/cities', options, callback);
  sabre_dev_studio.get('/v1/shop/flights/fares?origin=NYC&departuredate=2015-05-25&returndate=2015-05-30&maxfare=200', options, callback);
})

function sabreCall(q, res) {
  sabre_dev_studio.get(q, options, function(err, data) {
    response(res, err, data);
  });
}

app.get('/api/v1/cities', function(req,res) {
  sabreCall('/v1/lists/supported/cities', res);
});

app.get('/api/v1/places', function(req,res) {
  sabreCall('/v1/shop/flights/fares?origin=' + req.query.origin +
  '&departuredate=' + req.query.departuredate +
  '&returndate=' + req.query.returndate +
  '&maxfare=' + req.query.maxfare, res);
});

function response(res, err, data) {
  if (err) {
    res.status(200).send({
      'status': false,
      'message': 'Error',
      'info': err
    });
  } else {
    res.status(200).send({
      'status': true,
      'message': 'Success',
      'info': data
    });
  }
}

//
// app.get('/api/v1/cities', function(req,res) {
//   sabreCall('/v1/lists/supported/cities', res);
// });
//
// app.get('/api/v1/places', function(req,res) {
//   sabreCall('/v1/shop/flights/fares?origin=' + req.query.origin +
//   '&departuredate=' + req.query.departuredate +
//   '&returndate=' + req.query.returndate +
//   '&maxfare=' + req.query.maxfare, res);
// });



app.get('/restaurant', (req, res) => {
  Restaurant.find({}, (err, restaurants) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success",
        data: restaurants
      })
    }
  })
})

app.get('/restaurant/:id', (req, res) => {
  var ObjectId = mongoose.Types.ObjectId
  Restaurant.findOne({
    _id: new ObjectId(req.params.id)
  }, (err, restaurants) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success",
        data: restaurants
      })
    }
  })
})

app.post('/restaurant', (req, res) => {
  Restaurant.create(req.body, (err, restaurants) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success",
        data: restaurants
      })
    }
  })
})

app.put('/restaurant/:id', (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
    context: 'query'
  }, (err, restaurants) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success",
        data: restaurants
      })
    }
  })
})

app.put('/review/:restid', (req, res) => {
  Review.create(req.body, (err, review) => {
    if (err) {
      console.log(req.body)
      console.log("Error!", err);
      res.json({
        message: "Error",
        'err': err
      });
    } else {
      Restaurant.findOneAndUpdate({
        _id: req.params.restid
      }, {
        $push: {
          reviews: review
        }
      }, {
        multi: true
      }, (err, review) => {
        if (err) {
          console.log("Error!", err);
          res.json({
            message: "Error",
            'err': err
          });
        } else {
          res.json({
            message: "Success",
            'review': review
          })
        }
      })
    }
  })
})

app.get('/review/:restid', (req, res) => {
  var ObjectId = mongoose.Types.ObjectId
  Restaurant.find({
    _id: new ObjectId(req.params.restid)
  }, (err, restaurants) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success",
        data: restaurants[0].reviews
      })
    }
  })
})

app.delete('/restaurant/:id', (req, res) => {
  Restaurant.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success"
      })
    }
  })
})

app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
