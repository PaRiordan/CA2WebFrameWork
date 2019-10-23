const mongoose = require('mongoose');
const games = mongoose.model('games'); // not sure on this 


const gamesCreate = function (req, res) { 
  games.create({
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
    .json(games);
    }

  })
  };
     //http://localhost:3000/api/games  Post
const gamesByName = function (req, res) {res
    .status(200)
    .json({"status" : "success2"});  //http://localhost:3000/api/games  Get
     };



const gamesReadOne = function (req, res) {
    if (req.params && req.params.gamesid) {
      games
        .findById(req.params.gamesId)
        .exec((err, games) => {
          if (!games) {
            res	
              .status(404) 
              .json({	
                "message": "GamesID not found" // http://localhost:3000/api/games/5da27918f098483ced1b275e get  Always this, not getting the data
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
            .json(games);
        });
    } else {		
      res		
        .status(404) 	
        .json({	
          "message": "No Gamesid in request"
        });		
    }
  };
  
    
const gamesUpdateOne = function (req, res) {res
    .status(200)
    .json({"status" : "success3"});  //http://localhost:3000/api/games/5da271086071a6c8ae7069c3 put
     };
const gamesDeleteOne = function (req, res) {res
    .status(200)
    .json({"status" : "success4"}); //http://localhost:3000/api/games/5da271086071a6c8ae7069c3 delete
     };

module.exports = {
  gamesByName,
  gamesCreate,
  gamesReadOne,
  gamesUpdateOne,
  gamesDeleteOne
};
