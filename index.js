function TopTracks({request}) {
  return getTopTracksForArtist;

  function getTopTracksForArtist({artist, country}, done) {
    if (!country) {
      country = 'US';
    }

    var artistId = artist.replace('spotify:artist:', '');

    var reqOpts = {
      method: 'GET',
      url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${country}`,
      json: true
    };

    request(reqOpts, processTopTracksResponse);

    function processTopTracksResponse(error, res, body) {
      if (error) {
        done(error);
      }
      else if (body.error) {
        done(new Error('Top track error: ' + body.error.message));
      }
      else {
        // TODO: Trim track properties, save memory.
        done(error, body.tracks);
      }
    }
  }
}

module.exports = TopTracks;
