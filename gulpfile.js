const { dest, src, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const minifyCss = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const replace = require("gulp-string-replace");
const plumber = require("gulp-plumber");
const jsImport = require("gulp-js-import");
const uglify = require("gulp-uglify");
const twig = require("gulp-twig");
const beautify = require("gulp-beautify");
const include = require("gulp-include");
const data = require("gulp-data");
const babel = require("gulp-babel");
const fs = require("fs");
const postcss = require("gulp-postcss");
/**
 * @paths
 */

const paths = {
    // app
    pathApp: "./src",
    pathTools: "./src/assets/scss/tool.scss",
    pathMains: "./src/assets/scss/main.scss",
    pathPages: "./src/assets/scss/pages/**/*.scss",
    pathAppPlugins: "./src/assets/js/plugins/**/*.js",
    pathAppAddons: "./src/assets/js/addons/**/*.js",
    pathAppJs: "./src/assets/js/*.js",
    pathAppFonts: "./src/assets/fonts/**/*",
    pathAppImages: "./src/assets/images/**/*",
    pathAppView: "./src/views/pages/**/*.twig",
    database: "./src/database/data.json",
    pathTailwindjs: "./tailwind.config.js",
    //builds
    pathBuild: "./build/",
    pathBuildStyles: "./build/css",
    pathBuildPages: "./build/css/pages",
    pathBuildJsAddons: "./build/js/addons",
    pathBuildJsPlugins: "./build/js/plugins",
    pathBuildJs: "./build/js",
    pathBuildFonts: "./build/fonts/",
    pathBuildImages: "./build/images/",
};

/**
 * @autoprefixerBrowsers
 */

const autoprefixerBrowsers = [
    "last 3 versions",
    "iOS >= 8",
    "Safari >= 8",
    "ie >= 10",
    "Firefox 14",
    "safari 5",
    "opera 12.1",
    "ios 6",
    "android 4",
];
/**
 * @browserSync
 */
function browserSyncInit() {
    return browserSync.init({
        server: {
            baseDir: "./build",
        },
        port: 3000,
    });
}
/**
 * @scss
 */

function tools() {
    const tailwindcss = require("tailwindcss");
    return src(paths.pathTools)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(sass())
        .pipe(
            postcss([
                tailwindcss(paths.pathTailwindjs),
                require("autoprefixer"),
            ])
        )
        .pipe(minifyCss())
        .pipe(
            autoprefixer({
                browsers: autoprefixerBrowsers,
                cascade: false,
                grid: true,
            })
        )
        .pipe(dest(paths.pathBuildStyles))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
function mains() {
    return src(paths.pathMains)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(
            autoprefixer({
                browsers: autoprefixerBrowsers,
                cascade: false,
                grid: true,
            })
        )
        .pipe(dest(paths.pathBuildStyles))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
function pages() {
    return src(paths.pathPages)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(
            autoprefixer({
                browsers: autoprefixerBrowsers,
                cascade: false,
                grid: true,
            })
        )
        .pipe(dest(paths.pathBuildPages))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
/**
 * @js
 */

function appJsAddons() {
    return src(paths.pathAppAddons)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(dest(paths.pathBuildJsAddons))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

function appJsPlugins() {
    return src(paths.pathAppPlugins)
        .pipe(
            jsImport({
                hideConsole: true,
            })
        )
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(paths.pathBuildJsPlugins))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
function appJs() {
    return src(paths.pathAppJs)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(dest(paths.pathBuildJs))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
/**
 * @gulp-twig code html
 */

function views() {
    var getJsonData = function (file) {
        return JSON.parse(fs.readFileSync(paths.database));
    };
    var options = {
        indent_size: 4,
    };
    return src(paths.pathAppView)
        .pipe(
            plumber({
                errorHandler: function (error) {
                    console.log(error.toString());
                    this.emit("end");
                },
            })
        )
        .pipe(include())
        .pipe(data(getJsonData))
        .pipe(twig())
        .pipe(beautify.html({ options }))
        .pipe(replace("../../../../build/", ""))
        .pipe(replace("../../../build/", ""))
        .pipe(replace("../../build/", ""))
        .pipe(dest(paths.pathBuild))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

/**
 * @fonts
 */

function fonts() {
    return src(paths.pathAppFonts)
        .pipe(dest(paths.pathBuildFonts))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}
/**
 * @images
 */
function images() {
    return src(paths.pathAppImages)
        .pipe(dest(paths.pathBuildImages))
        .pipe(
            browserSync.reload({
                stream: true,
            })
        );
}

function dev() {
    watch("./src/assets/scss/**/*", tools);
    watch("./src/assets/scss/**/*", mains);
    watch("./src/assets/scss/**/*", pages);
    watch("./src/assets/js/Addons/**/*", appJsAddons);
    watch("./src/assets/js/plugins/**/*", appJsPlugins);
    watch("./src/assets/js/**/*", appJs);
    watch("./src/views/**/**", views);
    watch("./src/views/**/**", tools);
    watch("./src/database/**/*", views);
    watch("./src/assets/fonts/**/*", fonts);
    watch("./src/assets/images/**/*", images);
}
exports.default = parallel(
    tools,
    mains,
    pages,
    appJsAddons,
    appJsPlugins,
    appJs,
    views,
    dev,
    images,
    fonts,
    browserSyncInit
);
