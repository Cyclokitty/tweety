var Twit = require('twit');
var config = require('./config');

var Twitter = new Twit(config);

var retweet = function() {
  var params = {
    q: '#100DaysOfCode',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    if (!err) {
      var retweetId = data.statuses[0].id_str;
      Twitter.post('statuses/retweet/:id', {
        id: retweetId
      }, function(err, response) {
        if (response) {
          console.log('Retweeted!', data.statuses[0].text);
        }
        if (err) {
          console.log('Something went wrong while retweeting. Maybe a duplication?');
        }
      });
    }
    else {
      console.log('Something went wrong while searching...');
    }
  });
}

retweet();

setInterval(retweet, 3000000);

var favoriteTweet = function() {
  var params = {
    q: '#100DaysOfCode',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);
    if (typeof randomTweet != 'undefined') {
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response) {
        if (err) {
          console.log('CANNOT BE FAVORITE... Error');
        }
        else {
          console.log('FAVORITED... Success!');
        }
      });
    }
  });
}

favoriteTweet();

setInterval(favoriteTweet, 3600000);

function ranDom(arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
}
