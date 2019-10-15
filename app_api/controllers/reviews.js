const mongoose = require('mongoose');
const game = mongoose.model('games'); // not sure on this 

const reviewsCreate = function (req, res) {res
    .status(200)
    .json({"status" : "success5"});
    };
const reviewsReadOne = function (req, res) {res
    .status(200)
    .json({"status" : "success6"});
     };
const reviewsUpdateOne = function (req, res) { res
    .status(200)
    .json({"status" : "success7"});
    };
const reviewsDeleteOne = function (req, res) { res
    .status(200)
    .json({"status" : "success8"});
    };

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};
