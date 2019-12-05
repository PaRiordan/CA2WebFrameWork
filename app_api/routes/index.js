const express = require('express');
const router = express.Router();

const ctrlGames = require('../controllers/games');
const ctrlReviews = require('../controllers/reviews'); 


router
  .route('/games')
  .get(ctrlGames.gamesByName)
  .post(ctrlGames.gamesCreate);

router
  .route('/games/:gamesid')
  .get(ctrlGames.gamesReadOne)
  .put(ctrlGames.gamesUpdateOne)
  .delete(ctrlGames.gamesDeleteOne);
  
// reviews
router
  .route('/games/:gamesid/reviews')
  .post(ctrlReviews.reviewsCreate);

router
  .route('/games/:gamesid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
