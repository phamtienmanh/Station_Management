var _ = require('underscore');
var uuid = require('node-uuid');
var crypto = require('crypto');
var listKey = {};

exports.encrypt = function (keyword) {
    var hash = crypto.createHash('sha256').update(keyword).digest('hex');
    return hash;
}


exports.createKey = function (userName) {
    var token = String(uuid.v4()).replace(/-/gi,'')+crypto.randomBytes(64).toString('hex');
    if(listKey[userName]===undefined)
    {
      var tokens =[];
      tokens.push(token);
      listKey[userName] = tokens ;
    }
    else
    {
        if( ! _.contains(listKey[userName],token))
        {
            listKey[userName].push(token);
        }
    }
    return token;
}
exports.logout = function (token) {
    var islogOut = false;
    _.each(listKey, function (tokens, userName)
    {
       if( _.contains(tokens,token))
        {
             listKey[userName]=_.without(tokens,token);
             islogOut=true;
        }
    });
    return islogOut;
}
exports.checkToken = function (token) {
    var isToken = false;
    _.each(listKey, function (tokens, userName)
    {
        if( _.contains(tokens,token))
        {
            isToken = true;
        }
    });
    return isToken;
}
exports.getUserName = function (token) {
    var user="";
    _.each(listKey, function (tokens, userName)
    {
       if( _.contains(tokens,token))
       {
          user=userName;
       }
   });
    return user;
}