const Handlebars = require('handlebars');

class Comments {
    constructor() {
        //TODO - add and handle dynamic endpoint as param
        const defaultApiUrl = "https://my-json-server.typicode.com/telegraph/front-end-exercise-contractors/comments";
        this.commentsUrl = defaultApiUrl

        //Bind functions
        this.retrieveComments = this.retrieveComments.bind(this);
        this.injectComments = this.injectComments.bind(this);
        this.formatCommentDates = this.formatCommentDates.bind(this);
        this.commentSortLikes = this.commentSortLikes.bind(this);
        this.commentSortNewest = this.commentSortNewest.bind(this);
    }

    /**
     * Load comments from default API endpoint
     * @returns {Promise<Response>}
     */
    async retrieveComments() {
        try {
            return await fetch(this.commentsUrl).then(res => res.json());
        } catch (e) {
            return e;
        }
    }

    /**
     * Take in retrieved Comments as input param
     * Find Handlebars template for Comments in DOM, compile and inject to target enrichedComment element
     * @param comments
     */
    injectComments(comments) {
        const commentsTemplateId = "hb-template-comments";
        const enrichedCommentsId = "enriched-comments";
        const likesSortButtonId = "likes-sort";

        const commentsTemplateHtml = document.getElementById(commentsTemplateId).innerHTML;
        const enrichedCommentsEl = document.getElementById(enrichedCommentsId);

        const compiledCommentsTemplate = Handlebars.compile(commentsTemplateHtml);

        //Use spread to add on formatted localeDate field
        const commentsWithLocaleDate = comments.map(comment => ({
            ...comment,
            dateWithLocale: this.formatCommentDates(comment.date)
        }));
        enrichedCommentsEl.innerHTML = compiledCommentsTemplate({comments: commentsWithLocaleDate});

        const likesSortButton = document.getElementById(likesSortButtonId);

        likesSortButton.addEventListener('click', () => {
            this.commentSortLikes(comments);
        }, false);

        //TODO - Add listener for Newest Sort
    }

    /**
     * Convert date string format
     * @param dateString
     * @returns {string}
     */
    formatCommentDates(dateString) {
        //TODO - More tweaking needed to exactly match req. format
        const commentDate = new Date(dateString);
        const options = {
            day: "numeric",
            year: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        };
        return commentDate.toLocaleString(undefined, options);
    }

    /**
     * Sort comments by likes count, add CSS style to show button sort if applied and remove from Newest button
     * @param comments
     */
    commentSortLikes(comments) {
        const highestCommentLikes = comments.sort((a, b) => b.likes - a.likes);
        //TODO Add Update CSS button states for each button to toggle 'Sort Applied' state
        this.injectComments(highestCommentLikes);
    }

    commentSortNewest(comments) {
        //TODO - similar implementation to the likes sort, just needs adding/tests
    }
}

module.exports = Comments;