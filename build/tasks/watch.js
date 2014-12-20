module.exports = function (grunt) {
    return {
        scss: {
            files: ['<%= srcDir %>scss/**/*.scss'],
            tasks: ['compass:dev'],
            options: {
                spawn: false
            }
        },
        scripts: {
            files: ['<%= srcDir %>js/**/*.js'],
            tasks: ['uglify:dev'],
            options: {
                spawn: false
            }
        }
    }
}