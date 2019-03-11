var request = require('request');
var githubToken = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token' + githubToken.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    console.log(data[0]);
    cb(err, body);
  });
}

getRepoContributors("jquery", "jquery", function (err, result) {
  // console.log("Errors:", err);
  // console.log("Result:", result);
});