module.exports = {
    content: ["./src/**/*.{twig,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["SF Pro text", "sans-serif"],
                serif: ["SF Pro text", "serif"],
            },
            colors: {
                gray: {
                    200: "#BFBFBF",
                    300: "#8E8E93",
                    400: "#868E96",
                    500: "#424242",
                    800: "#212529",
                    900: "#232323",
                },
                blue: {
                    200: "#A3C6FF",
                    500: "#2C6CD5",
                },
                green: {
                    500: "#73FF81",
                },
                red: {
                    400: "#FFA6A6",
                },
                yellow: {
                    300: "#FFDE67",
                },
            },
        },
    },
    plugins: [],
};
