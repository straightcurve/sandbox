module.exports = {
  purge: [
      "src/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    backgroundColor: theme => ({
        ...theme("colors"),
        high: "#57544a",
        low: "#dad4bb",
        mid: "#979381",
        alert: "#cd664d",
        // "high-trans": rgba(87, 84, 74, 0.6),
        // "low-trans": rgba(218, 212, 187, 0.8),
        // "alert-trans": rgba(205, 102, 77, 0.7),
    }),
    textColor: theme => ({
        ...theme("colors"),
        high: "#57544a",
        low: "#dad4bb",
        mid: "#979381",
        alert: "#cd664d",
        // "high-trans": rgba(87, 84, 74, 0.6),
        // "low-trans": rgba(218, 212, 187, 0.8),
        // "alert-trans": rgba(205, 102, 77, 0.7),
    }),
    borderColor: theme => ({
        ...theme("colors"),
        high: "#57544a",
        low: "#dad4bb",
        mid: "#979381",
        alert: "#cd664d",
        // "high-trans": rgba(87, 84, 74, 0.6),
        // "low-trans": rgba(218, 212, 187, 0.8),
        // "alert-trans": rgba(205, 102, 77, 0.7),
    }),
    placeholderColor: theme => ({
        ...theme("colors"),
        high: "#57544a",
        low: "#dad4bb",
        mid: "#979381",
        alert: "#cd664d",
        // "high-trans": rgba(87, 84, 74, 0.6),
        // "low-trans": rgba(218, 212, 187, 0.8),
        // "alert-trans": rgba(205, 102, 77, 0.7),
    }),
  },
  variants: {
    extend: {
        backgroundColor: ["group-focus"],
        opacity: ["group-focus"],
        textColor: ["group-focus"],
    },
  },
  plugins: [],
}
