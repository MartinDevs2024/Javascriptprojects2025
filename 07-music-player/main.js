let progress = document.getElementById("progress");
let song = document.getElementById("song");
let songSource = document.getElementById("song-source");
let ctrlIcon = document.getElementById("ctrlIcon");

const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const songImg = document.getElementById("song-img");
const songSelector = document.getElementById("songSelector");

// Song data
const songData = {
  "drop-it-124014.mp3": {
    title: "Drop It",
    artist: "SoundMaster",
    thumbnail: "media/thumbnail.png",
    file: "media/drop-it-124014.mp3"
  },
  "track-tribe.mp3": {
    title: "Track Tribe",
    artist: "Tribal Beats",
    thumbnail: "media/thumbnail.png",
    file: "media/track-tribe.mp3"
  },
  "Despacito.mp3": {
    title: "Despacito",
    artist: "Luis Fonsi Ft. Puerto Rican",
    thumbnail: "media/thumbnail.png",
    file: "media/Despacito.mp3"
  }
};

// Load selected song
const loadSong = (songFile) => {
  const data = songData[songFile];
  if (!data) return;

  title.textContent = data.title;
  artist.textContent = data.artist;
  songImg.src = data.thumbnail;
  songSource.src = data.file;
  song.load();
  song.play();

  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

// Play/pause control
const playPause = () => {
  if (song.paused) {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
  } else {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  }
};

// On metadata load, update max progress
song.onloadedmetadata = () => {
  progress.max = song.duration;
};

// Update progress as song plays
song.addEventListener("timeupdate", () => {
  progress.value = song.currentTime;
});

// Seek in song
progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

// Resume playing after seeking
progress.addEventListener("change", () => {
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
});

// Change song from selector
songSelector.addEventListener("change", () => {
  loadSong(songSelector.value);
});

// Load default song on page load
window.addEventListener("load", () => {
  loadSong(songSelector.value);
});
