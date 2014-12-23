module.exports = function (grunt) {

    var extend = require('extend');


    var options = {
        sassDir: '<%= srcDir %>/scss/',
        cssDir: '<%= targetDir %>/css/',
        fontsDir: '<%= targetDir %>/css/fonts/',
        imagesDir: '<%= targetDir %>/css/'
    };

    return {
        dev: {
            options: extend(true, {}, options, {environment: 'development'})
        },
        prod: {
            options: extend(true, {}, options, {environment: 'production'})
        }
    }
}