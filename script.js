// ==========================
// Movie Together - script.js
// ==========================

// Get room code from URL
const params = new URLSearchParams(window.location.search);
const roomCode = params.get("room");

// Load username from localStorage
const username = localStorage.getItem("username") || "Guest";

// UI elements
const roomInfo = document.getElementById("roomInfo");
const videoPlayer = document.getElementById("videoPlayer");
const fileInput = document.getElementById("fileInput");

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Show room info
if (roomInfo) {
    roomInfo.innerText = `Room: ${roomCode} | User: ${username}`;
}

// ==========================
// VIDEO UPLOAD
// ==========================
if (fileInput) {
    fileInput.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        const url = URL.createObjectURL(file);
        videoPlayer.src = url;

        alert("Video loaded locally. Sync will come later.");
    });
}

// ==========================
// CHAT (LOCAL ONLY for now)
// ==========================
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.classList.add("msg");

    msg.innerHTML = `<b>${sender}:</b> ${text}`;

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message
sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    addMessage(text, username);
    messageInput.value = "";
}

// Enter key support
messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// ==========================
// PLACEHOLDER FOR SYNC (IMPORTANT)
// ==========================
// Later we will add Firebase:
// - play event sync
// - pause event sync
// - seek sync
// - chat sync in real-time