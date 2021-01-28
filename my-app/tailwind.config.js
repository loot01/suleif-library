module.exports = {
  purge: {
    content: ["./public/**/*.html", "./src/index.css", "./src/app.js"],
    options: {
      keyframes: true,
    },
  },

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
