module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        rootDir: './../',
        srcDir: '<%= rootDir %>src/',
        targetDir: '<%= rootDir %>dist/',
        bowerDir: './bower_components/',

        watch: require('./tasks/watch.js')(grunt),
        compass: require('./tasks/compass.js')(grunt),
        uglify: require('./tasks/uglify.js')(grunt),
        copy: require('./tasks/copy.js')(grunt),
        clean: require('./tasks/clean.js')(grunt)
    });

    grunt.registerTask('build', ['clean', 'copy', 'compass:prod', 'uglify:prod']);
    grunt.registerTask('buildDev', ['clean', 'copy', 'compass:dev', 'uglify:devLib', 'uglify:dev']);


};
