// ==========================
// Movie Together - chat.js
// ==========================

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Username + room (from script.js context)
const username = localStorage.getItem("username") || "Guest";

// ==========================
// ADD MESSAGE TO UI
// ==========================

function addMessage(sender, text, isSystem = false) {
    const msg = document.createElement("div");
    msg.classList.add("msg");

    if (isSystem) {
        msg.style.opacity = "0.6";
        msg.innerHTML = `<i>${text}</i>`;
    } else {
        msg.innerHTML = `<b>${sender}:</b> ${text}`;
    }

    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ==========================
// SEND MESSAGE
// ==========================

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    const messageData = {
        sender: username,
        text: text,
        time: Date.now()
    };

    // show locally immediately
    addMessage(username, text);

    // send to remote (Firebase later)
    sendChatMessage(messageData);

    messageInput.value = "";
}

// Button click
sendBtn.addEventListener("click", sendMessage);

// Enter key support
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// ==========================
// OUTGOING CHAT (HOOK)
// ==========================

function sendChatMessage(message) {
    console.log("Sending chat message:", message);

    // TODO (Firebase later):
    // firebase.database().ref("rooms/" + roomCode + "/chat").push(message);
}

// ==========================
// INCOMING CHAT (REMOTE)
// ==========================

function receiveChatMessage(message) {
    addMessage(message.sender, message.text);
}

// ==========================
// SYSTEM MESSAGES
// ==========================

function systemMessage(text) {
    addMessage(null, text, true);
}

// Example:
// systemMessage("User joined the room");