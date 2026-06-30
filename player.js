const video = document.getElementById("videoPlayer");

let isRemote = false;

// PLAY
video.addEventListener("play", () => {
    if (isRemote) return;

    updateRoom({
        type: "play",
        time: video.currentTime
    });
});

// PAUSE
video.addEventListener("pause", () => {
    if (isRemote) return;

    updateRoom({
        type: "pause",
        time: video.currentTime
    });
});

// SEEK
video.addEventListener("seeked", () => {
    if (isRemote) return;

    updateRoom({
        type: "seek",
        time: video.currentTime
    });
});

// LISTEN FOR REMOTE UPDATES
listenRoom((data) => {
    if (!data) return;

    isRemote = true;

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

    setTimeout(() => isRemote = false, 200);
});
