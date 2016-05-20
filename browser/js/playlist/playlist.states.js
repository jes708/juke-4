juke.config(function ($stateProvider) {

  $stateProvider.state('playlist', {
    url: '/playlist',
    templateUrl: '/js/playlist/templates/playlist.html',
    controller: 'PlaylistCtrl'
    // resolve: {
    //   allAlbums: function (AlbumFactory) {
    //     return AlbumFactory.fetchAll();
    //   }
    // }
  });

   $stateProvider.state('aplaylist', {
    url: '/playlist/:playlistId',
    templateUrl: '/js/playlist/templates/aplaylist.html',
    controller: 'APlaylistCtrl',
    resolve: {
      playlist: function (PlaylistFactory, $stateParams) {
        return PlaylistFactory.getPlaylist($stateParams.playlistId);
      },
      songs: function (AlbumFactory) {
        return AlbumFactory.fetchAll();
      }
    }
  });
});