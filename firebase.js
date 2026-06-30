import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    onSnapshot,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDFDw2EmSd1YW5MzgHL_avqZJPyE2qZ90Y",
    authDomain: "movie-84a98.firebaseapp.com",
    projectId: "movie-84a98",
    storageBucket: "movie-84a98.appspot.com",
    messagingSenderId: "1026087109302",
    appId: "1:1026087109302:web:988f3ec263b2847d9e9c17"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// room id
const room = new URLSearchParams(location.search).get("room");

const roomRef = doc(db, "rooms", room);
const chatRef = collection(db, "rooms", room, "chat");

// expose globally (IMPORTANT)
window.firebaseDB = {
    db,
    room,
    roomRef,
    chatRef
};

// UPDATE ROOM STATE
window.updateRoom = async (data) => {
    await setDoc(roomRef, data, { merge: true });
};

// LISTEN ROOM STATE
window.listenRoom = (callback) => {
    onSnapshot(roomRef, (snap) => {
        if (snap.exists()) callback(snap.data());
    });
};

// SEND CHAT
window.sendChat = async (msg) => {
    await addDoc(chatRef, {
        ...msg,
        timestamp: serverTimestamp()
    });
};

// LISTEN CHAT
window.listenChat = (callback) => {
    onSnapshot(chatRef, (snap) => {
        snap.docChanges().forEach(c => {
            if (c.type === "added") callback(c.doc.data());
        });
    });
};
