module.exports = {
    purge: ["src/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                144: "36rem",
            },
            "max-height": {
                144: "36rem",
            },
        },
        backgroundColor: (theme) => ({
            ...theme("colors"),
            high: "#57544a",
            low: "#dad4bb",
            mid: "#979381",
            /**
             *  bone
             */
            container: "#D6D0B8ff",
            /**
             *  sage
             */
            page: "#C6C3A9ff",
            /**
             * khaki-web
             */
            header: "#B0AB97ff",
            /**
             * black-olive
             */
            selection: "#454239ff",
            /**
             * medium-carmine
             */
            alert: "#B3543Eff",
        }),
        textColor: (theme) => ({
            ...theme("colors"),
            high: "#57544a",
            low: "#dad4bb",
            mid: "#979381",
            /**
             *  bone
             */
            container: "#D6D0B8ff",
            /**
             *  sage
             */
            page: "#C6C3A9ff",
            /**
             * khaki-web
             */
            header: "#B0AB97ff",
            /**
             * black-olive
             */
            selection: "#454239ff",
            /**
             * medium-carmine
             */
            alert: "#B3543Eff",
        }),
        borderColor: (theme) => ({
            ...theme("colors"),
            high: "#57544a",
            low: "#dad4bb",
            mid: "#979381",
            /**
             *  bone
             */
            container: "#D6D0B8ff",
            /**
             *  sage
             */
            page: "#C6C3A9ff",
            /**
             * khaki-web
             */
            header: "#B0AB97ff",
            /**
             * black-olive
             */
            selection: "#454239ff",
            /**
             * medium-carmine
             */
            alert: "#B3543Eff",
        }),
        placeholderColor: (theme) => ({
            ...theme("colors"),
            high: "#57544a",
            low: "#dad4bb",
            mid: "#979381",
            alert: "#cd664d",
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
};
