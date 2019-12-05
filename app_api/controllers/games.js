const mongoose = require('mongoose');
const Games = mongoose.model('Games'); // not sure on this 

const _buildGamesList = function(req, res, results, stats) {
  let games = [];
  results.forEach((doc) => {
    games.push({
      
      gameName: doc.obj.gameName,
      rating: doc.obj.rating,
      
      _id: doc.obj._id
    });
  });
  return games;
};


const gamesCreate = function (req, res) { 
  Games.create({
    gameName: req.body.gameName,
    rating: req.body.rating
  }, (err, games) => { 
    if (err) {
    res
    .status(400)
    .json(err);
    } else {
    res
    .status(201)
    .json(games);  //http://localhost:3000/api/games  Post not going in right. but going in
    }

  })
  };
     
const gamesByName = function (req, res) {res
    .status(200)
    .json({"status" : "success2"});  //http://localhost:3000/api/games  Get
     };



const gamesReadOne = function (req, res) {
    if (req.params && req.params.gamesid) {
      Games
        .findById(req.params.gamesid)
        .exec((err, games) => {
          if (!games) {
            res	
              .status(404) 
              .json({	
                "message": "GamesID not found" 
              });	 
            return;
          } else if (err) {
            res	
              .status(404) 
              .json(err); 
            return; 	
          }
          res		
            .status(200)
            .json(games); //http://localhost:3000/api/games/5de714598884d0ceda476e89/ get works
        });
    } else {		
      res		
        .status(404) 	
        .json({	
          "message": "No Gamesid in request"
        });		
    }
  };
  
  const gamesUpdateOne = function (req, res) {
    if (!req.params.gamesid) {
      res
        .status(404)
        .json({
          "message": "Not found, gameid is required"
        });
      return;
    }
    Games
      .findById(req.params.gamesid)
      .select('-reviews -rating')
      .exec((err, games) => {
        if (!games) {
          res
            .json(404)
            .status({
              "message": "gameid not found"
            });
          return;
        } else if (err) {
          res
            .status(400)
            .json(err);
          return;
        }
        games.gameName = req.body.gameName;
        games.rating = req.body.rating
        games.save((err, game) => {
          if (err) {
            res
              .status(404)
              .json(err);
          } else {
            res
              .status(200)
              .json(games);
          }
        });
      }
    );
  };
  
    
  const gamesDeleteOne = function (req, res) {
    const gamesid = req.params.gamesid;
    if (gamesId) {
      Games
        .findByIdAndRemove(gamesid) 
        .exec((err, game) => {
            if (err) {
              res
                .status(404)
                .json(err);
              return;
            }
            res
              .status(204)
              .json(null);
          }
      );
    } else {
      res
        .status(404)
        .json({
          "message": "No locationid"
        });
    }
  };

module.exports = {
  gamesByName,
  gamesCreate,
  gamesReadOne,
  gamesUpdateOne,
  gamesDeleteOne
};
