import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config';
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

client.connect();
const db = client.db(process.env.DB_NAME);

// API endpoints
// For checking the all Users db of nodeJsAPP -->
app.get('/checkusers', async (req, res) => {
    try {
        await client.connect();
        const coll = await client.db(process.env.DB_NAME).collection(process.env.CL_USR);
        const result = await coll.find({}).toArray();
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        console.log("error in /users", err);
    } finally {
        client.close();
    }
});

// For checking the all COURSES db of nodeJsAPP -->
app.get('/checkcourses', async (req, res) => {
    try {
        await client.connect();
        const coll = await client.db(process.env.DB_NAME).collection(process.env.CL_CSR);
        const result = await coll.find({}).toArray();
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        console.log("error in /users", err);
    } finally {
        client.close();
    }
});

// Async function for incrementing new userId :
async function getMaxUserId() {
    try {
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(process.env.CL_USR);
        const users = await collection.find({}).toArray();
        console.log("gettting all users from db :", users);
        const sortedUser = users.sort((user1, user2) => user2.id - user1.id);
        console.log("sorted users array : ", sortedUser);
        const maxUser = sortedUser[0];
        console.log("first user in the array : ", maxUser);
        const maxUserId = maxUser.id;
        console.log("id value of first user is ", maxUserId);
        console.log(maxUserId);
        return maxUserId;
    } catch (err) {
        console.log("error in getMaxUserId", err);
        return null;
    } finally {
        await client.close();
    }
}
// Incrementing by +Userid
app.post('/updateuser', async (req, res) => {
    const user = req.body;
    if (user) {
        try {
            const maxUserId = await getMaxUserId();
            const newUserId = maxUserId + 1;
            user.id = newUserId;
            await client.connect();
            const coll = client.db(process.env.DB_NAME).collection(process.env.CL_USR);
            const status = await coll.insertOne(user); // Insert the new user
            console.log("Updated user:", status);
            await client.close();
            res.send({ status });
        } catch (err) {
            console.log("Error adding user to db:", err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(400).send("Bad Request");
    }
});

//
app.get('/testuser', async (req, res) => {
    try {
        await client.connect();
        const coll = await client.db(process.env.DB_NAME).collection(process.env.CL_USR);
        const users = await coll.find({}).toArray();
        const maxId = 1;
        const sortedUser = (users.sort((user1, user2) => user2.id - user1.id)?.[0]?.id);
        console.log(sortedUser);
        res.status(200).send(users);
    } catch (err) {
        console.log("error in /testuser", err);
    } finally {
        client.close();
    }
});
///

// 1) Add User
app.post('/adduser', async (req, res) => {
    const users = req.body;
    if (users) {
        try {
            await client.connect();
            const coll = client.db(process.env.DB_NAME).collection(process.env.CL_USR);
            const status = await coll.insertOne(users);
            console.log("Updated user:", status);
            await client.close();
            res.send({ status });
        } catch (err) {
            console.log("Error adding user to db:", err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(400).send("Bad Request");
    }
});

// increating course +id 
async function getMaxCourseId() {
    try {
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(process.env.CL_CSR);
        const courses = await collection.find({}).toArray();
        console.log("Gettting all courses from db :", courses);
        const sortedCourse = courses.sort((course1, course2) => course2.course_id - course1.course_id);
        console.log("Sorted courses array : ", sortedCourse);
        const maxCourse = sortedCourse[0];
        console.log("First courses in the array : ", maxCourse);
        const maxCourseId = maxCourse.course_id;
        console.log("Id value of first courses is ", maxCourseId);
        console.log(maxCourseId);
        return maxCourseId;
    } catch (err) {
        console.log("error in getMaxCourseId", err);
        return null;
    } finally {
        await client.close();
    }
};
//
app.post('/updatecourse', async (req, res) => {
    const courses = req.body;
    if (courses) {
        try {
            const maxCourseId = await getMaxCourseId();
            const newCourseId = maxCourseId + 1;
            courses.course_id = newCourseId;
            await client.connect();
            const coll = client.db(process.env.DB_NAME).collection(process.env.CL_CSR);
            const status = await coll.insertOne(courses);
            console.log("Updated Courses :", status);
            await client.close();
            res.send({ status });
        } catch (err) {
            console.log("Error adding Course to db:", err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(400).send("Bad Request");
    }
});

//
app.get('/testcourse', async (req, res) => {
    try {
        await client.connect();
        const coll = await client.db(process.env.DB_NAME).collection(process.env.CL_CSR);
        const courses = await coll.find({}).toArray();
        const maxId = await getMaxCourseId();
        console.log("Max course id is ", maxId);
        const sortedCourse = (courses.sort((courses1, courses2) => courses2.course_id - courses1.course_id)?.[0]?.course_id);
        console.log(sortedCourse);
        res.status(200).send(courses);
    } catch (err) {
        console.log("error in /testcourse", err);
    } finally {
        client.close();
    }
});
//
async function getUserId(student_id) {
    try {
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(process.env.CL_USR);
        const user = await collection.findOne({ "id": parseInt(student_id) });
        console.log("gettting all users from db :", user);
        return user;
    } catch (err) {
        console.log("error in getUserId", err);
        return null;
    } finally {
        await client.close();
    }
}
//
app.get('/testuserid/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await getUserId(userId);
        console.log("User details:", user);
        res.status(200).json(user);
    } catch (err) {
        console.log("Error in /testuserid:", err);
        res.status(500).send("Internal Server Error");
    }
});
//
async function getCourseId(course_id) {
    try {
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(process.env.CL_CSR);
        const course = await collection.findOne({ "course_id": parseInt(course_id) });
        console.log("Gettting all courses from db :", course);
        return course;
    } catch (err) {
        console.log("error in CourseId", err);
        return null;
    } finally {
        await client.close();
    }
};
//
app.get('/testcourseid/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const course = await getCourseId(courseId);
        console.log("courses details:", course);
        res.status(200).json(course);
    } catch (err) {
        console.log("Error in /testcourseid:", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/registeruser/:student_id/:course_id', async (req, res) => {
    const student_id = req.params.student_id;
    const course_id = req.params.course_id;
    if (student_id && course_id) {
        try {
            const newUserId = await getUserId(student_id);
            console.log("Getting user Id : ", newUserId);
            const newCourseId = await getCourseId(course_id);
            console.log("Getting course Id :", newCourseId);
            await client.connect();
            const coll = client.db(process.env.DB_NAME).collection(process.env.CL_STD);
            const status = await coll.insertOne({ student_id: newUserId, course_id: newCourseId });
            console.log("Updated Registered User :", status);
            await client.close();
            res.send({ status });
        } catch (err) {
            console.log("Error Adding new register user ", err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(400).send("Bad Request ");
    }
});
app.get('/checkregister', async (req, res) => {
    try {
        await client.connect();
        const coll = await client.db(process.env.DB_NAME).collection(process.env.CL_STD);
        const result = await coll.find({}).toArray();
        console.log(result);
        res.status(200).send(result);
    } catch (err) {
        console.log("error in /users", err);
    } finally {
        client.close();
    }
});

// Updating Score through the JSON --->
app.post('/replacescores', async (req, res) => {
    const replaceUser = req.body;
    //validate inputs
    if (replaceUser) {
        try {
            await client.connect();
            const coll = await client.db(process.env.DB_NAME).collection(process.env.CL_STD);
            const status = await coll.replaceOne({ "student_details.student_id": 5}, replaceUser, { upsert: true });
            console.log("Replaced successfully,", status);
            res.send({ status }).json();
        } catch (err) {
            console.log("error updating user to db", err);
        } finally {
            await client.close();
        }
    } else {
        return res.send({}).json();
    }
});
// - - - Calculating the TOTAL SCORE  - - - - >
async function addTotalScore(studentscores) {
    try {
        const coll = client.db(process.env.DB_NAME).collection(process.env.CL_STD);
        const totalScore = studentscores.course_modules.reduce((total, module) => total + module.my_score, 0);
        console.log("Calculating Total Scores : ", totalScore);
        studentscores.student_score.total_score = totalScore;
        return totalScore;
    } catch (err) {
        console.log("error in /addTotalScore", err);
        return null;
    }
}
//
app.post('/updatescore', async (req, res) => {
    const studentscores = req.body;
    if (studentscores) {
        try {
            await client.connect();
            const totalNum = await addTotalScore(studentscores);
            console.log("Getting the total : ", totalNum);
            const coll = client.db(process.env.DB_NAME).collection(process.env.CL_STD);
            const status = await coll.updateOne({ "student_details.student_id": studentscores.student_details.student_id }, { $set: { "student_score.my_score": totalNum } });
            console.log("Updated Score :", status);
            await client.close();
            res.send({ status });
        } catch (err) {
            console.log("Error adding score to db:", err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(400).send("Bad Request");
    }
});
//
app.listen(process.env.PORT, () => {
    console.log(`API server is running on PORT ${process.env.PORT}`);
});