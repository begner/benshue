module.exports = function (grunt) {

    var appFiles = {
        '<%= targetDir %>js/app.js': [
            '<%= bowerDir %>jquery/dist/jquery.js',
            '<%= srcDir %>js/lib/**/*.js',
            '<%= srcDir %>js/init.js',
        ]
    }

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
    }
}