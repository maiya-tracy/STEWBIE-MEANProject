var express = require("express");

var path = require("path");

var app = express();
var bodyParser = require('body-parser');
var unirest = require('unirest');
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

var RatingSchema = new mongoose.Schema({
  adventure: {
    type: Number
  },
  budget: {
    type: Number
  },
  transportation: {
    type: Array
  },
  culture: {
    type: Array
  },
  dodos: {
    type: Number
  },
  review: {
    type: String,
    required: [true, "Must enter a review"]
  },
  name: {
    type: String,
    required: [true, "Must enter your name"]
  },
  location: {
    type: String,
    required: [true, "Must enter a location"]
  },
}, {
  timestamps: true
})
mongoose.model('Rating', RatingSchema);
var Rating = mongoose.model('Rating');
// RestaurantSchema.plugin(uniqueValidator);



app.post('/ratings', (req, res) => {
  Rating.create(req.body, (err, ratings) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success",
        data: ratings
      })
    }
  })
})
app.get('/ratings', (req, res) => {
  Rating.find({}, (err, ratings) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success",
        data: ratings
      })
    }
  })
})
app.get('/ratings/city', (req, res) => {
  Rating.findOne({location: new RegExp('^'+city_name+'$', "i")}, (err, ratings) => {
    if (err) {
      console.log("Returned error", err);
      res.json({
        message: "Error",
        error: err
      })
    } else {
      res.json({
        message: "Success",
        data: ratings
      })
    }
  })
})
app.delete('/ratings/:id', (req, res) => {
  Rating.findByIdAndRemove(req.params.id, (err) => {
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


//
// app.get('/restaurant', (req, res) => {
//   Restaurant.find({}, (err, restaurants) => {
//     if (err) {
//       console.log("Returned error", err);
//       res.json({
//         message: "Error",
//         error: err
//       })
//     } else {
//       res.json({
//         message: "Success",
//         data: restaurants
//       })
//     }
//   })
// })
//
// app.get('/restaurant/:id', (req, res) => {
//   var ObjectId = mongoose.Types.ObjectId
//   Restaurant.findOne({
//     _id: new ObjectId(req.params.id)
//   }, (err, restaurants) => {
//     if (err) {
//       console.log("Returned error", err);
//       res.json({
//         message: "Error",
//         error: err
//       })
//     } else {
//       res.json({
//         message: "Success",
//         data: restaurants
//       })
//     }
//   })
// })
//
// app.post('/restaurant', (req, res) => {
//   Restaurant.create(req.body, (err, restaurants) => {
//     if (err) {
//       console.log("Returned error", err);
//       res.json({
//         message: "Error",
//         error: err
//       })
//     } else {
//       res.json({
//         message: "Success",
//         data: restaurants
//       })
//     }
//   })
// })
//
// app.put('/restaurant/:id', (req, res) => {
//   Restaurant.findByIdAndUpdate(req.params.id, req.body, {
//     runValidators: true,
//     new: true,
//     context: 'query'
//   }, (err, restaurants) => {
//     if (err) {
//       console.log("Returned error", err);
//       res.json({
//         message: "Error",
//         error: err
//       })
//     } else {
//       res.json({
//         message: "Success",
//         data: restaurants
//       })
//     }
//   })
// })
//
// app.put('/review/:restid', (req, res) => {
//   Review.create(req.body, (err, review) => {
//     if (err) {
//       console.log(req.body)
//       console.log("Error!", err);
//       res.json({
//         message: "Error",
//         'err': err
//       });
//     } else {
//       Restaurant.findOneAndUpdate({
//         _id: req.params.restid
//       }, {
//         $push: {
//           reviews: review
//         }
//       }, {
//         multi: true
//       }, (err, review) => {
//         if (err) {
//           console.log("Error!", err);
//           res.json({
//             message: "Error",
//             'err': err
//           });
//         } else {
//           res.json({
//             message: "Success",
//             'review': review
//           })
//         }
//       })
//     }
//   })
// })
//
// app.get('/review/:restid', (req, res) => {
//   var ObjectId = mongoose.Types.ObjectId
//   Restaurant.find({
//     _id: new ObjectId(req.params.restid)
//   }, (err, restaurants) => {
//     if (err) {
//       console.log("Returned error", err);
//       res.json({
//         message: "Error",
//         error: err
//       })
//     } else {
//       res.json({
//         message: "Success",
//         data: restaurants[0].reviews
//       })
//     }
//   })
// })
//
// app.delete('/restaurant/:id', (req, res) => {
//   Restaurant.findByIdAndRemove(req.params.id, (err) => {
//     if (err) {
//       console.log("Returned error", err);
//       res.json({
//         message: "Error",
//         error: err
//       })
//     } else {
//       res.json({
//         message: "Success"
//       })
//     }
//   })
// })

app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
