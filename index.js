const Twit = require('twit');

const client = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
});

console.log(process.env.consumer_key);

const buzzconfio = '2711421331';
const stream = client.stream(`statuses/filter`, { follow: buzzconfio });
stream.on('tweet', function (tweet) {
  const id = tweet.id_str;
  console.log(id);
  if (!tweet.in_reply_to_status_id && !tweet.in_reply_to_user_id) {
    client.post('statuses/retweet/:id', { id })
      .then(done => {
        console.log('posted');
        console.log(tweet);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    console.log(`Don't retweet reply: ${id}`);
  }
});