Feature: Retrieve Comments from API

  Scenario: Show comments
    Given that I access the homepage
    Then the home page should return comments
    And each comment should show the username
      | Dawud Esparza     |
      | Lennie Wainwright |
      | Mindy Sykes       |
      | Arianne Ashton    |
      | Courteney Moreno  |

    #And each comment should show the date of the comment
    #And each comment should show the comment body
    #And each comment should show the like count

  @skip
  Scenario: Order comments by newest
    #Given that I click the Newest button in the comments area
    #Then then the comments should display in order of date
    #And the comments should show most recent first

  @skip
  Scenario: Order comments by likes
    #Given that I click the Likes button in the comments area
    #Then then the comments should display in order of most likes
    #And the comments should show most liked first