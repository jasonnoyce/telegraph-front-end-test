const Comments = require("./comments");

const commentMockData = [
    {
        "id": 1,
        "date": "2019-04-23T22:26:43.511Z",
        "name": "Dawud Esparza",
        "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
        "likes": 33
    },
    {
        "id": 2,
        "date": "2019-04-23T19:26:41.511Z",
        "name": "Lennie Wainwright",
        "body": "Quisque maximus augue ut ex tincidunt sodales. Nullam interdum consectetur mi at pellentesque.",
        "likes": 4
    },
    {
        "id": 3,
        "date": "2019-04-23T18:26:48.511Z",
        "name": "Mindy Sykes",
        "body": "Nam sit amet diam rutrum, venenatis est ac, tempus massa. Etiam tempus libero sit amet bibendum lacinia. Quisque ligula dolor, venenatis quis urna non, tristique laoreet erat.",
        "likes": 58
    },
    {
        "id": 4,
        "date": "2019-04-24T08:23:49.511Z",
        "name": "Arianne Ashton",
        "body": "Vivamus sit amet turpis nulla. Mauris rhoncus nulla in lobortis rhoncus.",
        "likes": 91
    }
];

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(commentMockData),
    })
);

const mockInjectComments = jest.spyOn(Comments.prototype, 'injectComments').mockImplementation();

beforeEach(() => {
    fetch.mockClear();
});

describe('Comments', () => {
    describe('retrieveComments', () => {
        it("should successfully retrieve comments", async () => {
            const comments = new Comments();
            const commentResults = await comments.retrieveComments();

            expect(commentResults).toBeTruthy();
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(commentResults.length).toEqual(4);

            //Use Snapshot to assert model
            expect(commentResults).toMatchSnapshot();
        });

        it("should fail to retrieve comments", async () => {
            fetch.mockImplementationOnce(() => Promise.reject(
                {
                    statusCode: 500,
                    message: "Error retrieving Comments"
                }));

            const comments = new Comments();
            const commentResults = await comments.retrieveComments();

            expect(fetch).toHaveBeenCalledTimes(1);
            expect(commentResults.statusCode).toEqual(500);
            expect(commentResults.message).toEqual("Error retrieving Comments");
        });
    });

    describe('formatCommentDates', () => {
        it("should transform date string to locale format", async () => {
            const comments = new Comments();
            const commentDateString = "2019-04-23T22:26:43.511Z";
            const expectedDateResult = "April 23, 2019, 11:26 PM";
            const formattedCommentDate = comments.formatCommentDates(commentDateString);

            expect(formattedCommentDate).toEqual(expectedDateResult)
        });
    });

    describe('sortByLikes', () => {
        it('should sort comments on number of likes in descending order ', async () => {
            const comment = new Comments();
            comment.commentSortLikes(commentMockData);

            expect(mockInjectComments).toHaveBeenCalledTimes(1);

            //Grab call to InjectMock and add snapshot to assert like order
            const callToMock = mockInjectComments.mock.calls[0][0];
            expect(callToMock).toMatchSnapshot();
        });
    });

});