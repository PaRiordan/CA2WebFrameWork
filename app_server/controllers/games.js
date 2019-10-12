/* GET 'home' page */
const home = function(req, res){
res.render('home', { title:'Home - Game Reviews by Gamers',
 pageHeader: {
     title: 'Home',
     strapline: 'Game Reviews by Gamers'
    },
 RecentReviews: [{
        gameName: 'Fifa',
        rating: '3',
        review:'Great Game'

    },
    {
        gameName: 'Read dead Redemption',
        rating: '5',
        review:'Super Game'

    },
    {
        gameName: 'Rainbow Six Siege',
        rating: '3',
        review:'cracking Game'

    }
]
    });
};

/* GET 'game info' page */
const gamesList = function(req, res){
res.render('games', { title: 'Games List' });
};
/* GET 'Add review' page */
const addReview = function(req, res){
res.render('addReview', { title: 'Add Review' });
};
/* GET 'Read review' page */
const readReview = function(req, res){
res.render('readReview', { title: 'Read Review' });
};

module.exports = {
home,
gamesList,
addReview,
readReview
};
