module.exports = function (grunt) {
    return {
        dev: {
            options: {
                sassDir: '<%= srcDir %>/scss/',
                cssDir: '<%= targetDir %>/css/',
                environment: 'production'
            }
        },
        prod: {
            options: {
                sassDir: '<%= srcDir %>/scss/',
                cssDir: '<%= targetDir %>/css/',
                environment: 'production'
            }
        }
    }
}