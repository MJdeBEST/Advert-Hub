// public/firebaseauth.js

// Ensure Firebase is initialized in index.html using the init script
// Access Firebase auth and Firestore directly as loaded in `index.html`

// Initialize Firebase Authentication and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

// You can now use `auth` and `db` in the rest of your code.
// Example of using auth and Firestore in compat syntax

// Example: Sign-in function using Firebase Authentication
function signInWithEmail(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully
      console.log("User signed in:", userCredential.user);
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
    });
}

// Example: Add a document to Firestore
function addUserData(uid, name, email) {
  db.collection("users").doc(uid).set({
    name: name,
    email: email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log("User data added to Firestore");
  })
  .catch((error) => {
    console.error("Error adding user data:", error);
  });
}

export { auth, db, signInWithEmail, addUserData };
