const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song Title
const songs = [
  "Chang Trai So Mi Hong - Hoang Duyen",
  "Sai Gon Dau Long Qua - Hua Kim Tuyen _ Hoang Duyen",
  "Sai Gon Hom Nay Mua JSOL _ Hoang Duyen",
];

// keep track songs
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `image/${song}.jpg`;
}

/* Play Song
 add class for music-container
 change icon in play btn
 play music */
function playSong() {
  musicContainer.classList.add("play");

  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

/* Pause Song
 remove class for music-container
 change icon in play btn
 pause music */
function pauseSong() {
  musicContainer.classList.remove("play");

  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

// previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update Progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// set progress

function setProgress(e) {
  const width = this.clientWidth;
  const widthX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (widthX / width) * duration;
}

// Event listener
playBtn.addEventListener("click", () => {
  // check play yet
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
audio.addEventListener("timeupdate", updateProgress);

// End song
audio.addEventListener("ended", nextSong);

// Click on Progress bar
progressContainer.addEventListener("click", setProgress);
