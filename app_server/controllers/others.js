/* GET login page */
const logIn = function(req, res){ 
res.render('logIn', { title: 'Log In',
pageHeader: {
    title: 'Log In',
    
   }, }); 
};
/* GET register page */
const register = function(req, res){ 
res.render('register', { title: 'Register',
pageHeader: {
    title: 'Sign Up',
    
   }, });   
};
module.exports = { 
logIn,
register 
};

