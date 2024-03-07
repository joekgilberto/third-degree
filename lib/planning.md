# Project:  Third Degree

## Project Summary:
An ASP.NET/React stack app that allows users to login, create quizzes, and take quizzes (anonymously or logged in).  MVP will include:
- A homepage
- An index page of quiz categories
- Category pages
- A quiz show page
- A new quiz page
- A quiz edit page
- A quiz delete confirmation pop up
- Login/Sign Up page
- User page

## Technologies Planned
ASP.NET, React, MongoDB, Redux, Axios, JWT Auth

## Deployment
Netlify client, Azure service

### First Model - Quiz
| Property     | Datatype                                        |
| ------------ | ----------------------------------------------- |
| _id          | Objectid                                        |
| title        | string                                          |
| questions    | List<Question>                                  |
| scores       | List<Score>                                     |
| poster       | string, Default a string to a placeholder image |
| posting_date | Date, default is today’s date                   |
| username     | string                                          |
| author       | _id: ObjectId, Ref: “User”                      |
| category     | _id: ObjectId, Ref: “Category”                  |

### Second Model - Question
| Property | Datatype     |
| -------- | ------------ |
| id       | int          |
| type     | string       |
| image?   | string       |
| question | string       |
| options? | List<string> |
| answer   | string       |

### Third Model - Answer
| Property | Datatype |
| -------- | -------- |
| id       | int      |
| answer   | string   |

### Fourth Model - Submission
| Property        | Datatype                      |
| --------------- | ----------------------------- |
| _id             | Objectid                      |
| answers         | List<Answer>                  |
| score           | double                        |
| username        | string                        |
| submission_date | Date, default is today’s date |
| user            | _id: ObjectId, Ref: “User”    |

### Fifth Model - Category
| Property | Datatype |
| -------- | -------- |
| _id      | Objectid |
| name     | string   |

### Sixth Model - User
| Property    | Datatype         |
| ----------- | ---------------- |
| _id         | Objectid         |
| username    | string           |
| password    | string           |
| submissions | List<Submission> |
| clearance   | number           |

### MVP CRUD / Restful routes
| Route type | CRUD operation | URL endpoint    | Model    |
| ---------- | -------------- | --------------- | -------- |
| POST       | Create         | /quiz/new       | Quiz     |
| POST       | Create         | /score/new      | Score    |
| POST       | Create         | /category/new   | Category |
| POST       | Create         | /user/signup    | User     |
| POST       | Create         | /user/login     | User     |
| GET        | Read           | /quiz           | Quiz     |
| GET        | Read           | /quiz/:id       | Quiz     |
| GET        | Read           | /user/:id       | User     |
| PUT        | Update         | /quiz/:id/edit  | Quiz     |
| PUT        | Update         | /score/:id/edit | Score    |
| DELETE     | Delete         | /quiz           | Quiz     |

### Links
**Link to Github Repo:** https://github.com/joekgilberto/third-degree 

**Link To Trello:** https://trello.com/b/GV1RwmqT/third-degree 

**Link to wireframe(s):** https://drive.google.com/drive/folders/1JVC3YhBO-xyrpbPrAAdWsMCCEGk5m3Fv?usp=drive_link 

**Link to ERD:** https://docs.google.com/drawings/d/1J2S1FdVVtZ2R7JEQvk5VNM9Ol-RZIEBkwq1mAsfkZ6o/edit?usp=sharing 

### User Story
1. As a user, I want to land on a welcoming home page with application information and navigation options.
2. As a user, I want to be able to navigate to a categories page with categories of different quizzes.
3. As a user, I want to read all quizzes in a categories page and select one to take.
4. As a user, I want to be able to fill out a quiz and receive a score.
5. As a user, I want to be able to login or sign up.
6. As a user, I want to be able to create quizzes for others to take.
7. As a user, I want to be able to edit and delete a quiz.
8. As a user, I want to be able to navigate to a user page to see a user’s scores and quizzes.
