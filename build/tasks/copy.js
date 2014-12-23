module.exports = function (grunt) {

    return {
        minicolors: {
            files: [
                // includes files within path
                {
                    expand: true,
                    cwd: '<%= bowerDir %>/jquery-minicolors/',
                    src: ['*.css'],
                    dest: '<%= targetDir %>/css/',
                    filter: 'isFile'
                },
                {
                    expand: true,
                    cwd: '<%= bowerDir %>/jquery-minicolors/',
                    src: ['*.png'],
                    dest: '<%= targetDir %>/css/',
                    filter: 'isFile'
                }
            ]
        },
        fontawesome: {
            files: [
                {
                    expand: true,
                    cwd: '<%= bowerDir %>/font-awesome/fonts',
                    src: ['*'],
                    dest: '<%= targetDir %>/css/fonts/',
                    filter: 'isFile'
                }
            ]
        }

    };

};