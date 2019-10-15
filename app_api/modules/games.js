const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        required: Number,
        min: 0,
        max: 5
    },
    reviewText: String,
   
})

const gamesSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5    
    },
  
    reviews: [reviewSchema]
 });

 mongoose.model('games', gamesSchema);

