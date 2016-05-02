var OAuth = require('OAuth').OAuth;


var Twitter = function(twitterKey, twitterSecret){

    var key = twitterKey;
    var secret = twitterSecret;

    var oauth = new OAuth('https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',key,secret,'1.0A',null, 'HMAC-SHA1');



    var getUserTimeLine = function(userKey,userSecret, userId, done){

        oauth.get('https://api.twitter.com/1.1/statuses/user_timeline.json?user_id='+userId,userKey,userSecret,

            function(err, results, res) {

                results = JSON.parse(results);
                done(results);

            });

    };

    return{
        getUserTimeLine:getUserTimeLine
    }

};

module.exports= Twitter;





//GET&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fsatuses%2Fuser_timeline.json&oauth_consumer_key%3DhC8v46dyIKyVOkGDb9OFnjR1q%26oauth_nonce%3D2b81b588fca70f7c7939986736189669%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1462203283%26oauth_token%3D295353377-WLHdVm5eUgJJppWxBT70cvUyu8LM87Cuiy3kbVLS%26oauth_version%3D1.0%26user_id%3D295353377%252F295353377-WLHdVm5eUgJJppWxBT70cvUyu8LM87Cuiy3kbVL%252Fdjpe2Md3Nott57lWTF4ttyDLAjNSjio2lxJA8pJ26oZfc
//Authorization header Authorization: OAuth oauth_consumer_key="hC8v46dyIKyVOkGDb9OFnjR1q", oauth_nonce="2b81b588fca70f7c7939986736189669", oauth_signature="UQ8AuG8dLTp9Kq9I2Hsw%2FyneIH0%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1462203283", oauth_token="295353377-WLHdVm5eUgJJppWxBT70cvUyu8LM87Cuiy3kbVLS", oauth_version="1.0"
//cURL command curl --get 'https://api.twitter.com/1.1/satuses/user_timeline.json' --data 'user_id=295353377%2F295353377-WLHdVm5eUgJJppWxBT70cvUyu8LM87Cuiy3kbVL%2Fdjpe2Md3Nott57lWTF4ttyDLAjNSjio2lxJA8pJ26oZfc' --header 'Authorization: OAuth oauth_consumer_key="hC8v46dyIKyVOkGDb9OFnjR1q", oauth_nonce="2b81b588fca70f7c7939986736189669", oauth_signature="UQ8AuG8dLTp9Kq9I2Hsw%2FyneIH0%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1462203283", oauth_token="295353377-WLHdVm5eUgJJppWxBT70cvUyu8LM87Cuiy3kbVLS", oauth_version="1.0"' --verbose