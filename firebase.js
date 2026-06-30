// ==========================
// Firebase Setup - Movie Together
// ==========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    onSnapshot,
    updateDoc,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ==========================
// YOUR FIREBASE CONFIG
// (Replace with your own)
// ==========================

const firebaseConfig = {
    apiKey: "AIzaSyDFDw2EmSd1YW5MzgHL_avqZJPyE2qZ90Y",
    authDomain: "movie-84a98.firebaseapp.com",
    projectId: "movie-84a98",
    storageBucket: "movie-84a98.firebasestorage.app",
    messagingSenderId: "1026087109302",
    appId: "1:1026087109302:web:988f3ec263b2847d9e9c17",
    measurementId: "G-GS7GWN52HL"
};

// Init
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================
// ROOM SETUP
// ==========================

const params = new URLSearchParams(window.location.search);
const roomCode = params.get("room");

const roomRef = doc(db, "rooms", roomCode);
const chatRef = collection(db, "rooms", roomCode, "chat");

// ==========================
// EXPORTS (used by other files)
// ==========================

window.firebaseDB = {
    db,
    roomRef,
    chatRef,
    roomCode
};

// ==========================
// REALTIME ROOM LISTENER
// ==========================

export function listenRoomChanges(callback) {
    onSnapshot(roomRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data());
        }
    });
}

// ==========================
// UPDATE VIDEO STATE
// ==========================

export async function updateRoomState(data) {
    await setDoc(roomRef, data, { merge: true });
}

// ==========================
// SEND CHAT MESSAGE
// ==========================

export async function sendChat(message) {
    await addDoc(chatRef, {
        ...message,
        timestamp: serverTimestamp()
    });
}

// ==========================
// LISTEN CHAT
// ==========================

export function listenChat(callback) {
    onSnapshot(chatRef, (snapshot) => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                callback(change.doc.data());
            }
        });
    });
}