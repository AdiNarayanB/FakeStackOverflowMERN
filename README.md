[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/hxTav0v1)
Login with your Northeastern credentials and read the Project Specifications [here](https://northeastern-my.sharepoint.com/:w:/g/personal/j_mitra_northeastern_edu/EcUflH7GXMBEjXGjx-qRQMkB7cfHNaHk9LYqeHRm7tgrKg?e=oZEef3).

Add design docs in _images/_

## Instructions to setup and run project

1. Navigate to the client folder, and ```npm install```
2. Navigate to the server folder, and ```npm install```
3. Navigate to the testing folder and ```npm install```
4. Navigate to the client folder and ```npm start```. This should load up a login page. 
5. Navigate to the server folder and run ```npm start```. This starts up the express server. 
6. On any path, run ```sudo systemctl start mongod```, this starts the database. run ```mongosh``` on the terminal, and then run ```use fake_so_new```. Make sure this database is empty.
7. Navigate to the testing directory, and then change the following line from ```node /home/adithya/finalProject/server/init.js mongodb://127.0.0.1:27017/fake_so_new``` to ```node YOURPATH/finalProject/server/init.js mongodb://127.0.0.1:27017/fake_so_new```
8. Run ```npx cypress open```, this should open up the cypress editor. Click on e2e, and then select fakeso.cy.js, the tests should run. 



## Test cases

| Use-case Name        | Test case Name                                                          |
| -------------------- | ----------------------------------------------------------------------- |
| Home Page            | Unregistered User - Create Account - 1                                  |
|                      | Question Summary Text less than 50 characters                           |
|                      | Question Vote 1                                                         |
|                      | Question vote 2                                                         |
|                      | Login Registered User - 2                                               |
|                      |                                                                         |
|                      | Home Page Registered User 1                                             |
|                      | Login Register 1                                                        |
| Login                | Login Register 2                                                        |
|                      | Login Register Welcome 1                                                |
|                      | Login Register Welcome 2                                                |
|                      | Home Page Guest User 1                                                  |
|                      | Unregistered User - Create Account - 2                                  |
|  Logout                    | Logout Registered User - 1                                              |
|                      | Search 1                                                                |
|                      | Search 2                                                                |
| User Profile         | Registered User UserProfile Verifcation                                 |
|                      | Viewer is Viewing Profile Page                                          |
|                      | UserProfile Page Contains Rep Points                                    |
|                      | UserProfile Page Contains Membership Time                               |
|                      | UserProfile Page Contains View User Questions Link                      |
|                      | UserProfile Page Contains View User Tags Link                           |
|                      | UserProfile Page Contains View User Answers Link                        |
|                      | UserProfile Tags Posted by the User                                     |
|                      | UserProfile Questions Posted by the User                                |
|                      | UserProfile Questions Posted by the User in Newest Order                |
|                      | UserProfile Answers Posted by the User                                  |
|                      | UserProfile Answers Displayed as links of 50 characters                 |
|                      | UserProfile New Answers Update                                          |
|                      | UserProfile New Answers Deletion                                        |
|                      | UserProfile New Questions Update                                        |
|                      | UserProfile New Questions Deletion                                      |
|                      | UserProfile New Tags Update                                             |
|                      | UserProfile New Questions Deletion                                      |
|                      | Homepage Registered User - 1                                            |
|                      |                                                                         |
|                      |                                                                         |
| Create Account       | Register Confirm Password match (NBD)                                   |
|                      | Register Email Confirmation                                             |
|                      |                                                                         |
|                      |
|                      | Registered User Add Question rep < 50                                   |
|                      | Registered User Add Question with Tags that are already in the database |
|                      | Guest User Add Answer                                                   |
|                      | New Question Form Error Long New Tag                                    |
|                      | Guest Answer Page 1                                                     |
| Answer Guest         | Guest Answer Page 2                                                     |
|                      | Guest Answer Page 3                                                     |
|  New Answer                    | Guest Answer Page 4                                                     |
|                      | Guest Answer Creation                                                   |
|                      | Registered User Answer Page 2                                           |
| Answer Registered    | Registered User Answer Page 3                                           |
|                      | Registered User Answer Page 4                                           |
|                      | Registered User - Pinned Answer                                         |
|                      | Registered User - Answer vote 1                                         |
|                      | Registered User- Answer vote 2                                          |
|                      | Registered User- View and Make Pinned Answer                            |
|                      | Registered User - No pinned answer                                      |
| Comments Guest/Registered                     | Checks if Comments Page has pagination enabled for comments             |
|                      | Registered User - Vote Answer Makes Question Active                     |
|                                | New Question                                                  |
|                                | New Comment Registered User Metadata                          |
|                                | New Comment Guest User                                        |
|                                | Registered User - Vote Answer Makes Question Active           |
|All Tags                                | New Question Form with many tags 2                            |
|                                | View All Tags in the Database                            |
|                                |         Newest  Order View Tags Format                    |
|                                |                           |



## Design Patterns Used

- Design Pattern Name: Factory Method Design Pattern

- Problem Solved: The Design Pattern was used to solve the creation of User Profile Metrics on the User Profile Page. The factory method is a creational design pattern that ensures that different products(instances of a class) are created using a common interface. In creating user metric profile, different rep points and membership objects for each user must be created. Thus, by using a factory method, were are able to generate each of these rep points and metric instaces, without messy if conditionals. As a result, how the each rep point and member ship instace is created for each user is now handled by the factory method interface. <br>

- Location in code where pattern is used: In the src/components folder the UserMetricsFactory.js contains the factory method function useMetricFetcher that returns different metric rep points, membership time instances, based on the type of user that has been passed in as a paramter. <br>

Design Pattern Name: Factory Method For Data Validation


There is a class called ValidationFactory.js that creates 2 types of validations based on an user input; A question validation object, and an answer validation object
An object of this class is initiated with the object type that needs to be validated, and the parameters that need to be validated. 

The return message that is obtained from calling validate from this object is dynamic in nature, i.e the message returned chanegs based on the validation object type that calls the valdiate method. 

The factory method can be used here since there is a parent factory that validates data of all kinds, with an interface method 'validate', that has a concrete implementation in both of the Question and Answer Base Validation. 

Why is this nessecary? 

By adding our data type specfic validation logic in a seperate class entirely, adding,editing and removing validations from and to each type of object becomes decoupled from the client code that calls it, thereby increasing readability of the client code, and also reducing bloat on the front end.  THese validations are also now reusable within several different components of the same client application, instead of being isolated to the component that has the logic to create it from scratch. 

In the event that a new data object needs to be validated(comments), we can just add its validation logic in the factory js file, and call the validation factory object across all components that need comments validated.





We use the validation factory in 2 cases:

1. Answer.js	:	

const validationFactory = new ValidationFactory();
    const validationInstance = validationFactory.createValidation("answer", answerText, username);
    return validationInstance.validate();
    
    
    



2. NewQuestion.js :


 const validationFactory = new ValidationFactory();
    const validationInstance = validationFactory.createValidation("question", title, text, tags);
    return validationInstance.validate();
    





- CYPRESS CODE COVERAGE IMPLEMENTATION: We implemented code coverage with cypress. <br>
- The steps used in generating our cypress code coverage includes: <br>

1.  In our client directory perform the following installs: <br>

- npm install @cypress/instrument-cra start
- npm install
- Execute window.\_\_coverage
- install the following package $ npm install @cypress/code-coverage in the Testing directory
- Add the statement import '@cypress/code-coverage/support’ in the “cypress/support/e2e.js”.
- const { defineConfig } = require('cypress')
  module.exports = defineConfig({
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
  setupNodeEvents(on, config) {
  require('@cypress/code-coverage/task')(on, config)
  // include any other plugin code...
  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config
  },
  },
  })
- Run the cypress tests (npx cypress run in the testing directory of our repo )
