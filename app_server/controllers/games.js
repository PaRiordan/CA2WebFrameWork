/* GET 'home' page */
const request = require('request');

const apiOptions = { 
    server : 'http://localhost:3000' 
    }; 
    if (process.env.NODE_ENV === 'production') { 
    apiOptions.server = 'https://shielded-shore-515741.herokuapp.com/'; 
    
    //heroku_8wmqjtd0:nodeon@ds233278.mlab.com:33278/heroku_8wmqjtd0
    }
  
    
        /* GET 'home' page */
        const home = function(req, res){
            const path = '/api/games'; 
            const requestOptions = { 
            url : apiOptions.server + path, 
            method : 'GET', 
            json : {}, 
            qs : { 
                lng : -0.9690884, 
                lat : 51.455041, 
                maxDistance : 20
                
                 
                } 
         
            }; 
            console.log("before request");
            request(requestOptions, (err,response, body) => {
            let data = body; 	
            if (response.statusCode === 200 && data.length) { 
                for (let i = 0; i < data.length; i++) { 
                    data[i].distance = _formatDistance(data[i].distance); 
                } 
                }	
            _renderHomepage(req, res,data); 
            } 
            );
            };

            const doAddReview = function(req, res){
                const gamesid = req.params.gamesid; 
                const path = `/api/games/${gamesid}/reviews`; 
                const postdata = { 
                 
                rating: parseInt(req.body.rating, 10), 
                reviewText: req.body.review 
                }; 
                const requestOptions = {
                url : apiOptions.server + path, 
                method : 'POST', 
                json : postdata 
                };
                if (!postdata.rating || !postdata.reviewText) { 
                res.redirect('/games/' + gamesid + '/review/new?err=val'); 
                } else {
                
                request( requestOptions,(err, response, body) => {
                if (response.statusCode === 201) { 
                res.redirect(`/games/${gamesid}`); 
                }else if (response.statusCode === 400 && body.gameName && body.gameName ==='ValidationError' ) { 
                res.redirect(`/games/${gamesid}/review/new?err=val`); 
                } 
                 else { 
                _showError(req, res, response.statusCode); 
                }
                }
                );
                }
                };

    const _renderHomepage = function(req, res, responseBody){
        let message = null; 
        if (!(responseBody instanceof Array)) { 
        message = "API lookup error"; 
        responseBody = []; 
        } else { 
        if (!responseBody.length) { 
        message = "No game found"; 
        } 
        }
        res.render('home', { title:'Home - Game Reviews by Gamers',
        pageHeader: {
            title: 'Home',
            strapline: 'Game Reviews by Gamers'
           },
          games: responseBody,
          message : message
        });
        };
        
        const _renderDetailPage = function (req, res, GameDetails) { 
            res.render('games', { 
            title: GameDetails.name, 
            pageHeader: {
                  title: GameDetails.name
                },
                
            games : Game
            });
            };

    const _showError = function (req, res, status) {
        let title = '';
        let content = '';
        if (status === 404) { 
        title = '404, page not found'; 
        content = 'Oh dear. Looks like we can\'t find this page. Sorry.'; 
        } else { 
        title = `${status}, something's gone wrong`; 
        content = 'Something, somewhere, has gone just a little bit wrong.'; 
        }
        res.status(status); 
        res.render('addReview', { 
        title : title, 
        content : content 
        }); 
        };

        /* GET 'Add review' page */
        const _renderReviewForm = function (req, res, GameDetails) { 
        res.render('addReview', {
        title: `Review ${GameDetails.gameName} on Games For Gamers`, 
        pageHeader: { title: `Review ${GameDetails.gameName}` },
        error: req.query.err 
        });
        };

        const _getGamesList = function (req, res, callback) { 
            const path = `/api/games/${req.params.gamesid}`;
            const requestOptions = {
            url : apiOptions.server + path,
            method : 'GET',
            json : {}
            };
            request(requestOptions,(err, response, body) => {
            let data = body;
            if (response.statusCode === 200) {
            data.coords = {
            lng : body.coords[0],
            lat : body.coords[1]
            };
            callback(req, res, data); 
            } else {
            _showError(req, res, response.statusCode);
            }
            }
            );
            };

        const gamesList = function(req, res){
            _getGamesList(req, res, (req, res, responseData) => { 
            _renderDetailPage(req, res, responseData); 
            }); 
            };

const addReview = function(req, res){
_getGamesList(req, res, (req, res, responseData) => { 
_renderReviewForm(req, res, responseData); 
}); 
};

/* GET 'Read review' page */
const readReview = function(req, res){
res.render('readReview', { title: 'Read Review' });
};

module.exports = {
home,
gamesList,
addReview,
readReview,
doAddReview
};
