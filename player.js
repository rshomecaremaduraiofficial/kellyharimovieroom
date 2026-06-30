// ==========================
// Movie Together - player.js
// Sync-ready video controller
// ==========================

const video = document.getElementById("videoPlayer");

// Prevent infinite sync loops
let isRemoteAction = false;

// ==========================
// CORE PLAYER EVENTS
// ==========================

// PLAY event
video.addEventListener("play", () => {
    if (isRemoteAction) return;

    console.log("Local play triggered");

    sendPlayerEvent({
        type: "play",
        time: video.currentTime
    });
});

// PAUSE event
video.addEventListener("pause", () => {
    if (isRemoteAction) return;

    console.log("Local pause triggered");

    sendPlayerEvent({
        type: "pause",
        time: video.currentTime
    });
});

// SEEK event
video.addEventListener("seeked", () => {
    if (isRemoteAction) return;

    console.log("Local seek triggered");

    sendPlayerEvent({
        type: "seek",
        time: video.currentTime
    });
});

// ==========================
// REMOTE ACTION HANDLER
// ==========================

function handleRemoteEvent(data) {
    isRemoteAction = true;

    if (data.type === "play") {
        video.currentTime = data.time;
        video.play();
    }

    if (data.type === "pause") {
        video.currentTime = data.time;
        video.pause();
    }

    if (data.type === "seek") {
        video.currentTime = data.time;
    }

    setTimeout(() => {
        isRemoteAction = false;
    }, 100);
}

// ==========================
// OUTGOING EVENTS (placeholder)
// ==========================
// Later this will send data to Firebase / WebSocket

function sendPlayerEvent(event) {
    console.log("Sending event:", event);

    // TODO:
    // firebase.database().ref("rooms/" + roomCode).set(event);
    // OR Firestore update
}

// ==========================
// OPTIONAL: FORCE SYNC
// ==========================

function syncTo(time) {
    isRemoteAction = true;
    video.currentTime = time;

    setTimeout(() => {
        isRemoteAction = false;
    }, 100);
}