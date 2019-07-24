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
var unirest = require('unirest');
unirest.post("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com").header("X-RapidAPI-Key", "efa1e54accmsh0ee65ac19151100p135c17jsn791d4358b1eb").end(function(result) {
  console.log(result.status, result.headers, result.body);
});



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

app.get('/places', (req,res) => {
  unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/USA/USD/en-US/?query=london")
    .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "efa1e54accmsh0ee65ac19151100p135c17jsn791d4358b1eb")
    .end(function(result) {
      console.log(result.status, result.headers, result.body);
      return result.body;
    });
})





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
