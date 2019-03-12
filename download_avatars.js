var request = require('request');
var githubToken = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + githubToken.GITHUB_TOKEN,
    }
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    // console.log(data[0]);
    cb(err, data);
  });
}

getRepoContributors("jquery", "jquery", function (err, result) {
  for (var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, './avatars/' +result[i].login + '.jpg');
    // console.log('Result:', result[i].avatar_url);
  } //loop for array
  console.log("Errors:", err);
  // console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}
