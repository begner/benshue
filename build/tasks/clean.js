module.exports = function (grunt) {

    return {
        options: {
            force: true
        },
        dist: ["<%= targetDir%>"]
    };
};
