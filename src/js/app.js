const Utils = require('./utils');
const Comments = require('./comments');

new Utils();

document.addEventListener("DOMContentLoaded", async () => {
    const comments = new Comments();

    //TODO - consider showing error message to UI & Handling for empty comments list
    const commentResults = await comments.retrieveComments().catch(error => console.log(error));
    comments.injectComments(commentResults);
});
