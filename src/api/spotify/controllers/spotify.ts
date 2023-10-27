/**
 * A set of functions called "actions" for `spotify`
 */
const querystring = require("querystring");

export default {
  searchSong: async (ctx, next) => {
    try {
      if (!ctx.query.text)
        throw new Error("La ricerca non ha prodotto risultati");
      const data = await strapi
        .service("api::spotify.spotify")
        .searchSong(ctx.query.text);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
  addSongToPlaylist: async (ctx, next) => {
    try {
      const data = await strapi
        .service("api::spotify.spotify")
        .addSongToPlaylist();
      console.log(data, "data");
      ctx.body = data;
    } catch (err) {
      console.log(err, "err");
      ctx.body = err;
    }
  },

  login: async (ctx, next) => {
    try {
      const data = await strapi.service("api::spotify.spotify").login(ctx);
      console.log(data, "data");
      ctx.body = data;
    } catch (err) {
      console.log(err, "err");
      ctx.body = err;
    }
  },

  callback: async (ctx, next) => {
    try {
      var code = ctx.query.code || null;
      var state = ctx.query.state || null;

      if (state === null) {
        ctx.redirect(
          "/#" +
            querystring.stringify({
              error: "state_mismatch",
            })
        );
      } else {
        var authOptions = {
          url: "https://accounts.spotify.com/api/token",
          form: {
            code: code,
            redirect_uri: "redirect_uri",
            grant_type: "authorization_code",
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                "26e1549d00364fc282eb09d0de3b30e8" +
                  ":" +
                  "b86c0b1ad4c545219c912ad2bafc0d67"
              ).toString("base64"),
          },
          json: true,
        };
      }
      ctx.body = "pork";
    } catch (err) {
      console.log(err, "err");
      ctx.body = err;
    }
  },
};
