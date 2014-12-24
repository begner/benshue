module.exports = function (grunt) {

    var extend = require('extend');

    var appFiles = {
        '<%= targetDir %>js/library.js': [
            '<%= bowerDir %>jquery/dist/jquery.js',
            '<%= bowerDir %>jquery.browser/dist/jquery.browser.js',
            '<%= bowerDir %>jquery-ui/ui/effect.js',
            '<%= bowerDir %>jquery-ui/ui/effect-clip.js',
            '<%= bowerDir %>jquery-ui/ui/effect-blind.js',
            // '<%= bowerDir %>jquery.animate-enhanced/scripts/src/jquery.animate-enhanced.js',
            '<%= bowerDir %>jquery-minicolors/jquery.minicolors.js',
            '<%= bowerDir %>jquery-hashchange/jquery.ba-hashchange.js',
            '<%= bowerDir %>bootstrap/dist/js/bootstrap.js'
        ]
    };

    var libFiles = {
        '<%= targetDir %>js/app.js': [
            '<%= srcDir %>js/lib/**/*.js',
            '<%= srcDir %>js/ui/**/*.js',
            '<%= srcDir %>js/views/**/*.js',
            '<%= srcDir %>js/controller.js',
            '<%= srcDir %>js/init.js'
        ]
    }

    return {
        dev: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            files: libFiles
        },
        devLib: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            files: appFiles
        },
        prod: {
            files: extend(true, {}, appFiles, libFiles)
        }
    };
};