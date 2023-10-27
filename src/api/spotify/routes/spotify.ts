export default {
  routes: [
    {
      method: "GET",
      path: "/spotify/search",
      handler: "spotify.searchSong",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/spotify/addToPlaylist",
      handler: "spotify.addSongToPlaylist",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/spotify/login",
      handler: "spotify.login",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/spotify/callback",
      handler: "spotify.callback",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
