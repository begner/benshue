module.exports = function (grunt) {
    return {
        scss: {
            files: ['<%= srcDir %>scss/**/*.scss'],
            tasks: ['compass:dev'],
            options: {
                spawn: false
            }
        },
        js: {
            files: ['<%= srcDir %>js/**/*.js'],
            tasks: ['uglify:dev'],
            options: {
                spawn: false
            }
        },
        html: {
            files: ['<%= srcDir %>html/**/*'],
            tasks: ['copy:html'],
            options: {
                spawn: false
            }
        },
        images: {
            files: ['<%= srcDir %>images/**/*'],
            tasks: ['copy:images'],
            options: {
                spawn: false
            }
        }
    }
}