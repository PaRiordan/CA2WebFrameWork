const mongoose = require('mongoose');
const game = mongoose.model('games'); // not sure on this 


const gamesCreate = function (req, res) { res
    .status(200)
    .json({"status" : "success1"});
    };
const gamesByName = function (req, res) {res
    .status(200)
    .json({"status" : "success2"});
     };



const gamesReadOne = function (req, res) {
    if (req.params && req.params.gamesId) {
      game
        .findById(req.params.gamesId)
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
    .json({"status" : "success3"});
     };
const gamesDeleteOne = function (req, res) {res
    .status(200)
    .json({"status" : "success4"});
     };

module.exports = {
  gamesByName,
  gamesCreate,
  gamesReadOne,
  gamesUpdateOne,
  gamesDeleteOne
};
