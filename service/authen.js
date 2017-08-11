var security= require( "../service/security");
exports.requireLogin = function(){
	return function(req, res, next) {
		if(!req.headers.token)
			return res.status(401).send({errors:["Must have login!"]});
		var token=req.headers.token;
		if(token&&security.checkToken(token))
		{
			req.authen={token:token, userName:security.getUserName(token)};
			return next();
		} else
		{
			return res.status(401).send({errors:["Must have login!"]});
		}
	};
}