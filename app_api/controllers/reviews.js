const mongoose = require('mongoose');
const games = mongoose.model('games'); // not sure on this 

const reviewsCreate = function (req, res) {res
    .status(200)
    .json({"status" : "success5"});
    };
const reviewsReadOne = function (req, res) {if (req.params && req.params.gamesid && req.params.reviewid) {
    games
      .findById(req.params.gamesid)
      .exec((err, games) => {
        if (!games) {
          res	
            .status(404) 
            .json({	
              "message": "gamesId not found"
            });	 
          return;
        } else if (err) {
          res	
            .status(404) 
            .json(err); 
          return; 	
        }
        if (games.reviews && games.reviews.length > 0) {
          const review = games.reviews.id(req.params.reviewid);
          if (!review) {
            res
              .status(404)
              .json({
                "message": "reviewid not found"
            });
          } else {
            response = {
              games : {
                gameName : games.gameName,
                id : req.params.gamesId
              },
              review : review
            };
            res
              .status(200)
              .json(response);
          }
        } else {
          res
            .status(404)
            .json({
              "message": "No reviews found"
          });
        } 
      });
  } else {		
    res		
      .status(404) 	
      .json({	
        "message": "Not found, gamesId and reviewid are both required"
      });		
  }

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
