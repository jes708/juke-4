'use strict';

juke.factory('PlaylistFactory', function ($http, $state, SongFactory) {

  var cachedPlaylists = []
  var cachedSongs = []

  var PlaylistFactory = {};

  PlaylistFactory.create = function (playlistName) {
    return $http.post ('/api/playlists', {name: playlistName})
    .then(function (response) { 
      var playlist = response.data;
      cachedPlaylists.push(playlist);
      console.log(playlist)
      $state.go('aplaylist', {playlistId: playlist.id})
      return playlist 
    });
  };

  PlaylistFactory.getPlaylists = function () {
    return $http.get ('/api/playlists')
    .then(function (response) {
        angular.copy(response.data, cachedPlaylists);
        return cachedPlaylists;
    })
  };


    PlaylistFactory.getPlaylist = function(playlistId) {
    return $http.get('/api/playlists/' + playlistId)
    .then (function (response) {
      response.data.songs.map(function(song) {return SongFactory.convert(song)})
      angular.copy(response.data.songs, cachedSongs);
      console.log(cachedSongs)
      response.data.songs = cachedSongs;
      return response.data
    })
  }

  PlaylistFactory.addSong = function(songId, playlistId) {
        // debugger;
    return $http.post('api/playlists/' + playlistId + '/songs', {id: songId})
      .then (function (response) {
      // console.log(response)
      var song = response.data
      cachedSongs.push(song)
      PlaylistFactory.getPlaylist(playlistId);
      return song
    })
  }

  PlaylistFactory.deleteSong = function(songId, playlistId) {
        // debugger;
    return $http.delete('api/playlists/' + playlistId + '/songs/' + songId)
      .then (function (response) {
        // cachedSongs = [];
        PlaylistFactory.getPlaylist(playlistId);
        // console.log(response)
        return response;
    })
  }

  return PlaylistFactory;

});



