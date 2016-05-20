juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory) {
  
  $scope.create = PlaylistFactory.create


});

juke.controller('APlaylistCtrl', function ($scope, playlist, songs, PlaylistFactory, PlayerFactory) {
  

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.playlist = playlist;
  $scope.songs = songs.map(function(album) {
    return album.songs
  }).reduce(function(songsArray, songArray) {
    return songsArray.concat(songArray)
  }, []);
  console.log($scope)

  $scope.addSong = PlaylistFactory.addSong;

  $scope.test = function(val) {
    console.log(val)
  }

    $scope.deleteSong = function(songId, playlistId) {
    PlaylistFactory.deleteSong(songId, playlistId)
    .then(function(response) {
      console.log($scope.playlist.songs)
    })
  };


});