// import { initializeApp } from "firebase/app";
// import firebase from 'firebase'
// import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyDgzNUT9KZyLhrZRkC77DV2mAih_qK8PDI",
//   authDomain: "classroom-12cbd.firebaseapp.com",
//   projectId: "classroom-12cbd",
//   storageBucket: "classroom-12cbd.appspot.com",
//   messagingSenderId: "278326856062",
//   appId: "1:278326856062:web:08a8793461ae974b57cb2f"
// };

// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore()
// const auth = firebase.auth()
// const provider = new firebase.auth.GoogleAuthProvider()
// const storage = firebase.storage()

// export { auth, provider, storage };
// export default db;

///////////////////////////////////////////////
// import firebase from "firebase/app";
// import 'firebase/firestore'
// import { initializeApp } from "firebase/app";
///////////////////////////////////////////////
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// import {getAuth, GoogleAuthProvider} from 'firebase/auth'
//////////////////for old//////////////////////////
import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgzNUT9KZyLhrZRkC77DV2mAih_qK8PDI",
  authDomain: "classroom-12cbd.firebaseapp.com",
  projectId: "classroom-12cbd",
  storageBucket: "classroom-12cbd.appspot.com",
  messagingSenderId: "278326856062",
  appId: "1:278326856062:web:08a8793461ae974b57cb2f"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
///////////////////////////////////////////////
// const app = firebase.initializeApp(firebaseConfig);
// const db = getFirestore(app)

// export const auth =  getAuth(firebaseApp);
// export const googleProvider = new GoogleAuthProvider();

// const auth = firebase.auth();

// export { db };
// const db = firebase.firestore();
// export default db;