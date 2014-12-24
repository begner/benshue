module.exports = function (grunt) {

    var extend = require('extend');


    var options = {
        sassDir: '<%= rootDir %>src/scss/',
        cssPath: '<%= targetDir %>css/',
        imagesPath: '<%= targetDir %>/images/',
        imagesDir: '<%= srcDir %>src',
        relativeAssets: true
    };

    return {
        dev: {
            options: extend(true, {}, options, {environment: 'development', outputStyle: 'expanded', noLineComments: false, sourcemap: true})
        },
        prod: {
            options: extend(true, {}, options, {environment: 'production', outputStyle: 'compressed'})
        }
    }
}