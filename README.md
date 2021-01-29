# we_the_people

## Git Branching Instructions 
here is what you should do in your projects each time you're ready to work on a new feature:
1. From the main branch, do a git pull to ensure you're working with the most up-to-date files.
2. git checkout -b <branch-name> to create a new branch to work from.
3. Code as normal.
4. When done working for the day, or ready to push your code to be merged, do your normal add and commit. When pushing be sure to push to your branch name with git push origin <branch-name> .
5. From GitHub, create a Pull Request from the branch you pushed, if you're ready to merge your code with the main branch.
6. Communicate with your team that you've created a pull request.
7. Once you know that your code has been merged, delete it locally by first changing to the main branch with git checkout main and then delete the branch that was merged with git branch -d <branch-name>.
8. Repeat.

## Review Pull Request Instructions 
* First you will want to test the changes introduced by the new  branch locally.In order to examine the new branch on your local machine, run the following commands in your terminal:
  ```
  git fetch
  ```
  ```
  git checkout -b <branch-name> origin/<branch-name>
  ```
* This code should bring the copy of the <branch-name> branch that's on GitHub onto your computer. 
* Normally you'd run the code here to make sure everything works properly.
* Check back out to your local `main` branch by running the following in your terminal:
  ```
  git checkout main
  ```
* Now go to your GitHub repo's main page and go to the "Pull request" section. Select the <branch-name> pull request from the list.
* At the next page select the option to see the "Files changed".
* You should be presented with all of the files that were changed in this PR.
* If there are any changes you would like made, you can click the line number to leave a comment the PR author will see and should address before approval. Otherwise click "Review changes" and approve the PR.
* Click the "Merge pull request" button to add the branch's changes into main. 
* Remember to use `git pull` on your main branch to update it.

## Presentation Requirements

https://docs.google.com/presentation/d/14wSzvTQAKXTAcwquColxzxfrM3apZIDSXQJdRINRyAA/edit?usp=sharing

COPIED TEMPLATE ^ 

* Elevator pitch: a one minute description of your application

* Concept: What is your user story? What was your motivation for development?

* Process: 
What were the technologies used? 

How were tasks and roles broken down and assigned? 

What challenges did you encounter? What were your successes?

* Demo: Show your stuff!

* Directions for Future Development

## Grading Metrics 

| Metric                | Weight | 
| ---                   | ---    |
| Technical Criteria    | 25%    |
| Concept               | 10%    |
| Deployment            | 20%    |
| Repository Quality    | 10%    |
| Application Quality   | 15%    |
| Presentation          | 10%    |
| Collaboration         | 10%    |

### Technical Acceptance Criteria: 25%

* Satisfies the following code requirements:

	~~* Application uses at least two server-side APIs.~~

    ~~* Application uses client-side storage to store persistent data.~~

    * Application doesn't use JS alerts, prompts, or confirms (uses modals instead).

    ~~* Application uses a CSS framework other than Bootstrap.~~

    ~~* Application is interactive (accepts and responds to user input)~~

### Concept 10%

~~* Application should be a unique and novel idea.~~

* Your group should clearly and concisely articulate your project idea.

### Deployment: 20%

* Application deployed at live URL and loads with no errors.

### Repository Quality: 10%

* Have a clean repository that meets quality coding standards 

~~* Repository has a unique name.~~

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

### Application Quality: 15%

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application is responsive.

### Presentation 10%

* Every group member should speak during the presentation.

* Your presentation should follow the [Project Presentation Template](https://docs.google.com/presentation/d/1_u8TKy5zW5UlrVQVnyDEZ0unGI2tjQPDEpA0FNuBKAw/edit?usp=sharing).

### Collaboration 10%

* There are no major disparities in the number of GitHub contributions between group members.

## Submission on BCS

Each member is required to submit the following:

https://raquellee.github.io/group_project/

https://github.com/RaquelLee/group_project

# Description

# Technologies Used

# Screenshots
![Screenshot](https://github.com/RaquelLee/group_project/blob/main/assets/images/)

# Link to Deployed Application
[Our Project](https://github.com/RaquelLee/group_project)