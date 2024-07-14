# Course Registration System
The `Course Registration System` is a Node.js and Express-based application designed to manage users, courses, registrations, and scores. Utilizing MongoDB for data storage, it offers a range of API endpoints for CRUD operations on these entities.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js
- MongoDB
- npm (Node Package Manager)

## API Endpoints

### Check All Users

- **URL:** `/checkusers`
- **Method:** `GET`
- **Description:** Retrieves all users from the database.
- **Response:** JSON array of user objects.

### Check All Courses

- **URL:** `/checkcourses`
- **Method:** `GET`
- **Description:** Retrieves all courses from the database.
- **Response:** JSON array of course objects.

### Update User

- **URL:** `/updateuser`
- **Method:** `POST`
- **Description:** Adds a new user to the database.
- **Request Body:** JSON object representing the new user.
- **Response:** JSON object confirming the insertion status.

### Update Course

- **URL:** `/updatecourse`
- **Method:** `POST`
- **Description:** Adds a new course to the database.
- **Request Body:** JSON object representing the new course.
- **Response:** JSON object confirming the insertion status.

### Register User to Course

- **URL:** `/registeruser/:student_id/:course_id`
- **Method:** `POST`
- **Description:** Registers a user to a course.
- **Path Parameters:**
  - `student_id`: ID of the student.
  - `course_id`: ID of the course.
- **Response:** JSON object confirming the registration status.

### Replace Scores

- **URL:** `/replacescores`
- **Method:** `POST`
- **Description:** Updates a user's scores in the database.
- **Request Body:** JSON object containing updated scores.
- **Response:** JSON object confirming the update status.

### Update Score

- **URL:** `/updatescore`
- **Method:** `POST`
- **Description:** Updates a user's score in the database.
- **Request Body:** JSON object containing the user's updated score details.
- **Response:** JSON object confirming the update status.

### Get User by ID

- **URL:** `/testuserid/:userId`
- **Method:** `GET`
- **Description:** Retrieves a user by their ID from the database.
- **Path Parameter:**
  - `userId`: ID of the user.
- **Response:** JSON object representing the user.

### Get Course by ID

- **URL:** `/testcourseid/:courseId`
- **Method:** `GET`
- **Description:** Retrieves a course by its ID from the database.
- **Path Parameter:**
  - `courseId`: ID of the course.
- **Response:** JSON object representing the course.

### Check Registered Users

- **URL:** `/checkregister`
- **Method:** `GET`
- **Description:** Retrieves all registered users and courses from the database.
- **Response:** JSON array of registered user-course pairs.

### Test User Endpoint

- **URL:** `/testuser`
- **Method:** `GET`
- **Description:** Retrieves all users from the database.
- **Response:** JSON array of user objects.

### Test Course Endpoint

- **URL:** `/testcourse`
- **Method:** `GET`
- **Description:** Retrieves all courses from the database.
- **Response:** JSON array of course objects.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/KislayKashyap-hub/Course-Registration-System.git

## Usage

1. Clone the repository: `git clone https://github.com/your-username/your-repository.git`
2. Install dependencies: `npm install`
3. Set up your MongoDB database and configure `.env` file with database credentials.
4. Run the application: `npm start`
5. Use the provided API endpoints to manage students, courses, modules, and scores.
6. Use mongorestore ~ /dump file to get all database.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

