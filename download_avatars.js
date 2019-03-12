var request = require('request');
var githubToken = require('./secrets.js');
var fs = require('fs');
let args = process.argv.slice(2);

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

getRepoContributors(args[0], args[1], function (err, result) {
  for (var i = 0; i < result.length; i++) {
    downloadImageByURL(result[i].avatar_url, './avatars/' +result[i].login + '.jpg');
    // console.log('Result:', result[i].avatar_url); passed downloadImageByURL
    // into here instead
  } //loop for array
  if (!args[0] || !args[1]) {
    console.log("Errors: invalid or missing arguments");
  }

  // console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
}
