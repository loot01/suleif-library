/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  buildOptions: {
    baseUrl: "",
  },
  plugins: [
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "postcss src/index.css -o public/styles.css",
        watch: "postcss src/index.css -o public/styles.css -w",
      },
    ],
  ],
  packageOptions: {
    NODE_ENV: true,
  },
  buildOptions: {
    clean: true,
    out: "dist",
  },
};
