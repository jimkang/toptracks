toptracks
==================

Just gets top tracks for a Spotify artist. Not much code, but it DRYs up a common task. Requires ES6.

The Spotify API requires an auth token for top tracks requests, so you'll have to register an application and go through the auth process (a module like `get-spotify-client-credentials' can help you on the server) in order to pass a token to `TopTracks`.

Installation
------------

    npm install toptracks

Usage
-----

    var TopTracks = require('toptracks');
    var request = require('request');
    var getSpotifyClientCredentials = require('get-spotify-client-credentials');

    getSpotifyClientCredentials(
      {
        clientId: <Your Spotify API clientId>,
        clientSecret: <Your Spotify API clientSecret>,
        request: request
      },
      useCreds
    );

    function useCreds(error, token) {
      if (error) {
        console.log(error);
      }
      else {
        var topTracks = TopTracks({
          request: request // Any http request function that implements the request interface can go here
        });
        topTracks({artist: 'spotify:artist:69lt02nubfNbPdrvH4tJxx', country: 'US'}, logTopTracks);
      }
    }

    function logTopTracks(error, tracks) {
      if (error) {
        console.log(error);
      }
      else {
        console.log(tracks.map(track => track.name));
      }
    }

Output:

    [
      'Disavow Your God',
      'Celestial Nature',
      'Programmers Of Decline',
      'Temple of the Art-God',
      'Inner Alchemy',
      'Diverted Logic',
      'The Mystic Triad of Artistry',
      'An Order to Reclaim',
      'Rebirth Of Senses',
      'From Passion to Holiness'
    ]

`artist` can be either a Spotify URI like `spotify:artist:69lt02nubfNbPdrvH4tJxx` or just the id like `69lt02nubfNbPdrvH4tJxx`.

Any request function that implements the [request](https://github.com/request/request) interface can be passed to the constructor, freeing you up to use something lightweight in the browser if desired. [Here is an example of a function that implements request.](https://github.com/jimkang/spotify-resolve#plug-in-your-own-request-library)

Development
-----

Lint with `make lint`.
Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
