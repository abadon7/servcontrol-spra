import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyD9A4YI-F2owAmvYBnzK1XxUcut2UZflJo",
    authDomain: "stlist-4402f.firebaseapp.com",
    databaseURL: "https://stlist-4402f.firebaseio.com",
    projectId: "stlist-4402f",
    storageBucket: "stlist-4402f.appspot.com",
    messagingSenderId: "955361731943"
};

firebase.initializeApp(config)
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;