module.exports = function (grunt) {

    return {
        minicolors: {
            files: [
                // includes files within path
                {
                    expand: true,
                    cwd: '<%= bowerDir %>/jquery-minicolors/',
                    src: ['*.css'],
                    dest: '<%= targetDir %>css/',
                    filter: 'isFile'
                },
                {
                    expand: true,
                    cwd: '<%= bowerDir %>/jquery-minicolors/',
                    src: ['*.png'],
                    dest: '<%= targetDir %>images/',
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
                    dest: '<%= targetDir %>fonts/',
                    filter: 'isFile'
                }
            ]
        },
        bootstrap: {
            files: [
                {
                    expand: true,
                    cwd: '<%= bowerDir %>/bootstrap/dist/fonts/',
                    src: ['*'],
                    dest: '<%= targetDir %>fonts/',
                    filter: 'isFile'
                }
            ]
        },
        images: {
            files: [
                {
                    expand: true,
                    cwd: '<%= srcDir %>images',
                    src: ['*'],
                    dest: '<%= targetDir %>images/',
                    filter: 'isFile'
                }
            ]
        },
        html: {
            files: [
                {
                    expand: true,
                    cwd: '<%= srcDir %>html',
                    src: ['*'],
                    dest: '<%= targetDir %>/',
                    filter: 'isFile'
                }
            ]
        }

    };

};