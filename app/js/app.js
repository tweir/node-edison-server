requirejs.config({
    "baseUrl": "public/dist/vendor",
    "paths": {
      "app": "../..",
      "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);