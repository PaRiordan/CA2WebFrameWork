const mongoose = require('mongoose');
const Games = mongoose.model('Games'); // not sure on this 

const reviewsCreate = function(req, res) {
  const gamesid = req.params.gamesid;
  if (gamesid) {
    Games
      .findById(gamesid)
      .select('reviews')
      .exec((err, games) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          _doAddReview(req, res, games);  // https://shielded-shore-51574.herokuapp.com/api/games/5dab4ff9807ba70fcc565a0f/reviews adds review to fifa 19
        }
      }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, gamesid required"
      });
  }
};


 
  

const reviewsReadOne = function (req, res) {if (req.params && req.params.gamesid && req.params.reviewid) {
  Games // is this the database or the collection
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
                id : req.params.gamesid
              },
              review : review
            };
            res
              .status(200)
              .json(response); //http://localhost:3000/api/games/5de714598884d0ceda476e89/reviews/5de7255cf535f90baca498db get works
                                // https://shielded-shore-51574.herokuapp.com/api/games/5dab4ff9807ba70fcc565a0f/reviews/5de8916c9bdc420017267ee2 
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
        "message": "Not found, gamesId and reviewid are both required" //http://localhost:3000/api/games/5dab501d807ba70fcc565a11/reviews/5dab523f807ba70fcc565a13 get
      });		
  }

     };

     const reviewsUpdateOne = function (req, res) {
      if (!req.params.gamesid || !req.params.reviewid) {
        res
          .status(404)
          .json({
            "message": "Not found, gamesid and reviewid are both required"
          });
        return;
      }
      Games
        .findById(req.params.gamesid)
        .select('reviews')
        .exec((err, game) => {
          if (!game) {
            res
              .status(404)
              .json({
                "message": "gamesid not found"
              });
            return;
          } else if (err) {
            res
              .status(400)
              .json(err);
            return;
          }
          if (game.reviews && game.reviews.length > 0) {
            let thisReview = game.reviews.id(req.params.reviewid);
            if (!thisReview) {
              res
                .status(404)
                .json({
                  "message": "reviewid not found"
                });
            } else {

              thisReview.rating = req.body.rating;
              thisReview.reviewText = req.body.reviewText;
              games.save((err, games) => {
                if (err) {
                  res
                    .status(404)
                    .json(err);
                } else {
                  _updateAverageRating(games._id);
                  res
                    .status(200)
                    .json(thisReview);
                }
              });
            }
          } else {
            res
              .status(404)
              json({
                "message": "No review to update"
              });
          }
        }
      );
    };
    
    const reviewsDeleteOne = function (req, res) {
      if (!req.params.gamesid || !req.params.reviewid) {
        res
          .status(404)
          .json({
            "message": "Not found, locationid and reviewid are both required"
          });
        return;
      }
      Games
        .findById(req.params.gamesid)
        .select('reviews')
        .exec((err, games) => {
          if (!games) {
            res
              .status(404)
              .json({
                "message": "gamesid not found"
              });
            return;
          } else if (err) {
            res
              .status(400)
              .json(err);
            return;
          }
          if (gamesreviews && game.reviews.length > 0) {
            if (!games.reviews.id(req.params.reviewid)) {
              res
                .status(404)
                .json({
                  "message": "reviewid not found"
                });
            } else {
             games.reviews.id(req.params.reviewid).remove(); 
              game.save((err) => {
                if (err) {
                  res
                    .status(404)
                    .json(err);
                } else {
                  updateAverageRating(game._id);
                  res
                    .status(204)
                    .json(null);
                }
              });
            }
          } else {
            res
              .status(404)
              .json({
                "message": "No review to delete"
              });
          }
        }
      );
    };

// PRIVATE HELPER METHODS


    const _doAddReview = function(req, res, game) {
      if (!game) {
        res
          .status(404)
          .json({
            "message": "gameid not found"
          });
      } else {
        game.reviews.push({
          rating: req.body.rating,
          reviewText: req.body.reviewText
        });
        game.save((err, game) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            _updateAverageRating(game._id);
            let thisReview = game.reviews[game.reviews.length - 1];
             res
               .status(201)
               .json(thisReview);
          }
        });
      }
    };

    const _updateAverageRating = function(gameid) {
      Games
        .findById(gameid)
        .select('rating reviews')
        .exec((err, game) => {
          if (!err) {
            _doSetAverageRating(game); 
          }
        });
    };

    const _doSetAverageRating = function(games) {
      if (games.reviews && games.reviews.length > 0) {
        const reviewCount = games.reviews.length;
        let ratingTotal = 0;
        for (let i = 0; i < reviewCount; i++) {
          ratingTotal = ratingTotal + games.reviews[i].rating;
        }
        let ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        games.rating = ratingAverage;
        games.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Average rating updated to", ratingAverage);
          }
        });
      }
    };

    require('./games');
    
module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};
