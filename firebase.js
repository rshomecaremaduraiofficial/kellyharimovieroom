// ==========================
// Firebase Setup - FIXED VERSION
// ==========================

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

// ==========================
// CONFIG
// ==========================

const firebaseConfig = {
    apiKey: "AIzaSyDFDw2EmSd1YW5MzgHL_avqZJPyE2qZ90Y",
    authDomain: "movie-84a98.firebaseapp.com",
    projectId: "movie-84a98",
    storageBucket: "movie-84a98.appspot.com",
    messagingSenderId: "1026087109302",
    appId: "1:1026087109302:web:988f3ec263b2847d9e9c17"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================
// ROOM
// ==========================

const params = new URLSearchParams(window.location.search);
const roomCode = params.get("room");

const roomRef = doc(db, "rooms", roomCode);
const chatRef = collection(db, "rooms", roomCode, "chat");

// ==========================
// MAKE GLOBAL ACCESSIBLE
// ==========================

window.roomCode = roomCode;
window.roomRef = roomRef;
window.chatRef = chatRef;
window.db = db;

// ==========================
// ROOM SYNC (REAL-TIME)
// ==========================

export function listenRoom(callback) {
    onSnapshot(roomRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data());
        }
    });
}

// update play/pause/seek state
export function updateRoom(data) {
    setDoc(roomRef, data, { merge: true });
}

// ==========================
// CHAT SYNC
// ==========================

export function sendChat(message) {
    addDoc(chatRef, {
        ...message,
        timestamp: serverTimestamp()
    });
}

export function listenChat(callback) {
    onSnapshot(chatRef, (snapshot) => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                callback(change.doc.data());
            }
        });
    });
}
