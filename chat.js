const chatBox = document.getElementById("chatBox");
const input = document.getElementById("messageInput");

const username = localStorage.getItem("username") || "Guest";

// send
document.getElementById("sendBtn").onclick = () => {
    const text = input.value;
    if (!text) return;

    sendChat({
        user: username,
        text
    });

    input.value = "";
};

// receive
listenChat((msg) => {
    const div = document.createElement("div");
    div.className = "msg";
    div.innerHTML = `<b>${msg.user}:</b> ${msg.text}`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
});
