const express = require('express');
const router = express.Router();

const ctrlGames = require('../controllers/games');
const ctrlOthers = require('../controllers/others'); 
 


/* Review pages  */
router.get('/', ctrlGames.home);
router.get('/games/:gamesid', ctrlGames.gamesList);
router
.route('/games/:gamesid/review/addReview')
.get(ctrlGames.addReview)
.post(ctrlGames.doAddReview);
router.get('/games/review/read', ctrlGames.readReview);

/* Other pages */
router.get('/logIn', ctrlOthers.logIn);
router.get('/register', ctrlOthers.register);
module.exports = router;


