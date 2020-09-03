import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDQxHDjZCudA8f4xtaBCaJOceuqoicrEtg",
  authDomain: "clothing-palette.firebaseapp.com",
  databaseURL: "https://clothing-palette.firebaseio.com",
  projectId: "clothing-palette",
  storageBucket: "clothing-palette.appspot.com",
  messagingSenderId: "398823313339",
  appId: "1:398823313339:web:fa5eda9fb51ba76c583e9e",
  measurementId: "G-L4R5KCDHMH"

};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
