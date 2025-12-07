Feature: Task Management System

  Scenario: View all tasks
    When I go to '/tasks'
    Then the page should include 'All tasks'

  Scenario: Navigate to create new task form
    When I go to '/tasks'
    And I click on 'Create new task'
    Then the page should include 'Create a new task'

  Scenario: View task creation form directly
    When I go to '/tasks/new'
    Then the page should include 'Create a new task'
