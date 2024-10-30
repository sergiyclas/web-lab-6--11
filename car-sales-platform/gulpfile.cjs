const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;

// Dynamically import gulp-webp as an ES module
let webp;
(async () => {
    const module = await import('gulp-webp');
    webp = module.default;
})();

let createComponent = (done) => {
    const componentName = argv.name;

    if (!componentName) {
        console.error('Please provide a component name using --name');
        done();
        return;
    }

    // Define the paths
    const componentDir = path.join(__dirname, 'src', 'Components', componentName);
    const stylesDir = path.join(componentDir, 'Styles');
    const componentFile = path.join(componentDir, `${componentName}.jsx`);
    const stylesFile = path.join(stylesDir, `${componentName}.scss`);

    // Create directories
    fs.mkdirSync(stylesDir, { recursive: true });

    // Define the component file content
    const componentContent = `
import "./Styles/${componentName}.css"

function ${componentName}(){
    return (
        <div className="${componentName}">
           <h2 className="${componentName}__headline">
                ${componentName}
           </h2>
        </div>
    )
}

export default ${componentName}
`;

    const stylesContent = `
@import "../../../Modules/conf";

.${componentName} {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: flex-start;
  justify-content: flex-start;

  .${componentName}__headline {
    width: 100%;

    @extend %headline;
    text-align: center;
  }
}
`;

    // Write files
    fs.writeFileSync(componentFile, componentContent.trim());
    fs.writeFileSync(stylesFile, stylesContent.trim());

    console.log(`Component ${componentName} created successfully.`);
    done();
}

let createRoute = (done) => {
    const routeName = argv.name;

    if (!routeName) {
        console.error('Please provide a route name using --name');
        done();
        return;
    }

    const routerDir = path.join(__dirname, 'Server', 'API-Routers', routeName);
    const routerFile = path.join(routerDir, `Router.js`);
    const routerControllerFile = path.join(routerDir, `Controller.js`);

    fs.mkdirSync(routerDir, { recursive: true });

    const routeContent = `
const {Router} = require('express');
const controller = require('./Controller');
const {corsMiddleware, tokenEncryptorMiddleware} = require('../../Modules/middleware');
const setupWhitelist = require("../../Modules/whitelistSetup")

const router = Router();

router.use(corsMiddleware);
router.options('*', corsMiddleware);
router.use(tokenEncryptorMiddleware);

router.get("/", setupWhitelist(["ADMIN", "MANAGER"]), controller.defaultAction)


module.exports = router
`;

    const ControllerContent = `
class Controller {
    async defaultAction(req, res) {
        res.status(200).send("OK")
    }    
}


module.exports = new Controller()
`;

    // Write files
    fs.writeFileSync(routerFile, routeContent.trim());
    fs.writeFileSync(routerControllerFile, ControllerContent.trim());

    console.log(`Route ${routeName} created successfully.`);
    done();
}


function compileStyles() {
    return gulp.src(['./**/*.scss', '!./node_modules/**'], { since: gulp.lastRun(compileStyles) })
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'));
}

async function convertImg() {
    // Wait for the dynamic import if webp is not defined yet
    while (!webp) {
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    return gulp.src(['./**/*.jpg', './**/*.png', './**/*.jpeg', '!./node_modules/**', '!./Server/**'], { since: gulp.lastRun(convertImg) })
        .pipe(webp())
        .pipe(gulp.dest('./'));
}

exports.compileStyles = compileStyles;

exports.watchSass = function () {
    gulp.watch(['./src/**/*.scss'], gulp.series(compileStyles));
};

exports.imgConvert = convertImg;
exports.createComponent = createComponent;
exports.createRoute = createRoute;

exports.default = gulp.parallel(compileStyles, convertImg);
