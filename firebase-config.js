// firebase-config.js
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

const firebaseConfig = {
    apiKey: "your-real-api-key",
    authDomain: "softmeet-advert-68517.firebaseapp.com",
    projectId: "softmeet-advert-68517",
    storageBucket: "softmeet-advert-68517.appspot.com",
    messagingSenderId: "your-real-messaging-sender-id",
    appId: "your-real-app-id",
    measurementId: "your-real-measurement-id"
};

// Initialize Firebase for the Client SDK (optional, if you need Firestore on server)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "softmeet-advert-68517",
});

const adminDb = admin.firestore();
const UserCollection = adminDb.collection("users");

module.exports = { UserCollection, db, admin, app };
