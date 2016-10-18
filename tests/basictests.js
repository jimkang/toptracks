var test = require('tape');
var TopTracks = require('../index');
var assertNoError = require('assert-no-error');
var request = require('request');

var testCases = [
  {
    opts: {
      artist: 'spotify:artist:69lt02nubfNbPdrvH4tJxx',
    }
    // expected: {
    // }
  }
];

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', basicTest);

  function basicTest(t) {
    var topTracks = TopTracks({
      request: request
    });
    topTracks(testCase.opts, checkTracks);

    function checkTracks(error, tracks) {
      assertNoError(t.ok, error, 'No error when getting top tracks.');
      tracks.forEach(checkTrack);
      // console.log(tracks.map(track => track.name));
      t.end();
    }

    function checkTrack(track) {
      t.ok(track.id, 'Track has an id.');
      t.equal(track.artists[0].id, testCase.opts.artist.split(':')[2], 'Track artist is correct.');
      t.ok(track.name, 'Track has a name.');
    }
  }
}
