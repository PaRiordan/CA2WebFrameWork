/* GET login page */
const logIn = function(req, res){ 
res.render('logIn', { title: 'Log In' }); 
};
/* GET register page */
const register = function(req, res){ 
res.render('register', { title: 'Register' }); 
};
module.exports = { 
logIn,
register 
};

