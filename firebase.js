import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAiQPy5U0zc_wwdNj7UFn8kN4z_BcI_Fg",
    authDomain: "rookas-whatsapp-app.firebaseapp.com",
    projectId: "rookas-whatsapp-app",
    storageBucket: "rookas-whatsapp-app.appspot.com",
    messagingSenderId: "445307904149",
    appId: "1:445307904149:web:232d93e6784e77ab83bb9c",
    measurementId: "G-TBCDX796Q5"
};

// if we initialized, use the old one
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};
