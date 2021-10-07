import firebase from "firebase/app";
import config from "./config.json";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp(config);

let provider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}
export const storage = firebase.storage();
export default firebase;