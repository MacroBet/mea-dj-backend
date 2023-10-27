export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "meadj"),
      user: env("DATABASE_USERNAME", "marco"),
      password: env("DATABASE_PASSWORD", "marco"),
      ssl: env.bool("DATABASE_SSL", false) && {
        rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
      },
    },
    debug: false,
  },
});
