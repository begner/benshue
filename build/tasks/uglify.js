module.exports = function (grunt) {

    var appFiles = {
        '<%= targetDir %>js/app.js': [
            '<%= bowerDir %>jquery/dist/jquery.js',
            '<%= bowerDir %>jquery-minicolors/jquery.minicolors.js',
            '<%= srcDir %>js/lib/**/*.js',
            '<%= srcDir %>js/ui/**/*.js',
            '<%= srcDir %>js/init.js'
        ]
    };

    return {
        dev: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            files: appFiles
        },
        prod: {
            files: appFiles
        }
    };
};