import { Given, Then } from "cypress-cucumber-preprocessor/steps";

const homepage = "/";

Given("that I access the homepage", () => {
    cy.visit(homepage);
});

Then("the home page should return comments",  () => {
    cy.get('[data-testid="comments-count-testId"]').should(
        "contain.text", "5 Comments"
    );
});

Then("each comment should show the username",  (usernameDataTable) => {
    usernameDataTable.rawTable.forEach(([username], index) => {
        cy.get('[data-testid="comments-list-testId"]')
            .find('[data-testid="comment-username-testId"]')
            .eq(index)
            .should("contain.text", username);
    });
});