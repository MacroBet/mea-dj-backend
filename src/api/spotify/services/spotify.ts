/**
 * spotify service
 */
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import axios from "axios";
const querystring = require("querystring");

const client_id = "26e1549d00364fc282eb09d0de3b30e8";
const client_secret = "b86c0b1ad4c545219c912ad2bafc0d67";

//
export const spotifyApi = SpotifyApi.withClientCredentials(
  client_id,
  client_secret
);

export default () => ({
  searchSong: async (textSearch) => {
    console.log("Searching Spotify for The Beatles...");
    const items = await spotifyApi.search(textSearch, ["track"], "IT", 7);
    const response = items.tracks.items.map((item) => ({
      name: item.name,
      artists: item.artists.map((artist) => artist.name).join(", "),
      popularity: item.popularity,
      id: item.id,
    }));
    return response;
  },

  addSongToPlaylist: async () => {
    console.log("Adding song to playlist...");
    await spotifyApi.playlists.addItemsToPlaylist("3zlRMe0yEl92R5sx8KjTy9", [
      "spotify:track:4Z1kNXrZTXvM7Il3RdDblN",
    ]);
    console.log("Song added to playlist");
    return "Song added to playlist";
  },

  login: async (ctx, next) => {
    console.log("login not implemented");
    ctx.body = "login not implemented";
  },

  DEPRECATEDlogin: async (ctx, next) => {
    try {
      const redirectUri = "http://localhost:1337/api/spotify/callback";
      const code =
        "AQCWMoeserQdm6FQXEwoOm1eB8kwo35Yt_JsfKnUDlKvwxZwM29Gl1BSobAIYo-NYOWcUdsEZbd1dpJhiGrEBZSd2TNwhdEqT8P-g0ulf3QykvYFWiIcP9Zw3WZQZgkevJe1YjmR-RKDxOwkSHknye0n__OLnlN1PUk83YhVEQULbxI88QEPSUB0PcjJYlxXB6cVwgTkNn1fMHKzZxKzBUpNzvdp5XoALdLPm02evI_sGw";

      var state = "1234567890123456";
      var scope = "user-read-private user-read-email";
      // const redirectUrl =
      //   "https://accounts.spotify.com/authorize?" +
      //   querystring.stringify({
      //     response_type: "code",
      //     client_id: client_id,
      //     scope: scope,
      //     redirect_uri: "http://localhost:1337/api/spotify/callback",
      //     state: state,
      //   });
      // console.log(redirectUrl);
      // ctx.redirect(redirectUrl);

      // Make a POST request to Spotify to exchange the code for an access token
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          params: {
            code,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${client_id}:${client_secret}`
            ).toString("base64")}`,
          },
        }
      );

      // Parse the response and save the access token and refresh token
      const { access_token, refresh_token } = response.data;
      // TODO: Save these tokens securely, e.g., in a database

      // Now you have the access token, you can use it to make authorized Spotify API requests
      const spotifyApi = new SpotifyApi(access_token);

      await spotifyApi.playlists.addItemsToPlaylist("3zlRMe0yEl92R5sx8KjTy9", [
        "spotify:track:4Z1kNXrZTXvM7Il3RdDblN",
      ]);
      console.log("Song added to playlist");
      // Redirect the user to a success page or perform further actions
      ctx.redirect("/success");
    } catch (err) {
      console.log(err, "err");
      ctx.body = err;
    }
  },
});
