import firebase from 'firebase';
// Required for side-effects
require('firebase/firestore');

const config = {
  apiKey: "AIzaSyDJ71PhyR4DS6SIrvYzRdJTyjyt7CTDIUw",
  authDomain: "test-a7c3d.firebaseapp.com",
  databaseURL: "https://test-a7c3d.firebaseio.com",
  projectId: "test-a7c3d",
  storageBucket: "",
  messagingSenderId: "560919073476",
  appId: "1:560919073476:web:b480aa1f7b5cdf34"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const firebaseAuth = firebase.auth;
