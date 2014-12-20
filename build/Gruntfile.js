module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        rootDir: './../',
        srcDir: '<%= rootDir %>src/',
        targetDir: '<%= rootDir %>htdocs/',
        bowerDir: './bower_components/',

        watch: require('./tasks/watch.js')(grunt),
        compass: require('./tasks/compass.js')(grunt),
        uglify: require('./tasks/uglify.js')(grunt)

    });

    grunt.registerTask('default', ['compass', 'uglify']);


};
