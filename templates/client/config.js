System.config({
  defaultJSExtensions: true,
  transpiler: "none",
  paths: {
    "*": "dist/src/*",
    "dist/aurelia.js": "dist/aurelia.js",
    "dist/app-build.js": "dist/app-build.js",
    "styles/*": "styles/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  }
});
