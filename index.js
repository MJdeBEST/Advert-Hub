// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { UserCollection, db, admin } = require('./firebase-config');
const { setDoc, doc, updateDoc } = require('firebase/firestore');
const { getAuth } = require('firebase-admin/auth');

const app = express();
app.use(express.json());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/SignIn', (req, res) => res.render('SignIn'));
app.get('/SignUp', (req, res) => res.render('signUp'));
app.get('/homepage', (req, res) => res.render('homepage'));
app.get('/profile_page', (req, res) => res.render('profile_page'));


// Sign-up Route
app.post('/signup', async (req, res) => {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
        return res.status(400).send({ error: "All fields are required" });
    }

    try {
        const userRecord = await admin.auth().createUser({
            email, password, displayName: `${name} ${surname}`,
        });

        const userDocRef = doc(db, "users", userRecord.uid);
        await setDoc(userDocRef, {
            uid: userRecord.uid, name, surname, email
        });

        res.status(201).send({ msg: "User successfully registered" });
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).send({ error: error.message });
    }
});

// Server Start
app.listen(4000, () => console.log("Server is running on port 4000"));
