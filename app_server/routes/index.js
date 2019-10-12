const express = require('express');
const router = express.Router();

const ctrlGames = require('../controllers/games');
const ctrlOthers = require('../controllers/others'); 
 


/* Review pages  */
router.get('/', ctrlGames.home);
router.get('/games', ctrlGames.gamesList);
router.get('/games/review/addReview', ctrlGames.addReview);
router.get('/games/review/read', ctrlGames.readReview);

/* Other pages */
router.get('/logIn', ctrlOthers.logIn);
router.get('/register', ctrlOthers.register);
module.exports = router;


