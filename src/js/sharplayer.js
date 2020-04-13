// create elements
let top_div = document.createElement("div");
top_div.classList.add("top");
let artwork_div = document.createElement("div");
artwork_div.classList.add("artwork");
let right_panel_div = document.createElement("div");
right_panel_div.classList.add("right-panel");
let controlls_div = document.createElement("div");
controlls_div.classList.add("controlls");
let prev_btn = document.createElement("button");
prev_btn.classList.add("pre-track");
prev_btn.innerHTML = `<span class="material-icons">skip_previous</span>`;
let play_pause_btn = document.createElement("button");
play_pause_btn.classList.add("play-pause-track");
play_pause_btn.innerHTML = `<span class="material-icons">play_arrow</span>`;
let next_btn = document.createElement("button");
next_btn.classList.add("next-track");
next_btn.innerHTML = ` <span class="material-icons">skip_next</span>`;
// second row marquee
let track_marquee = document.createElement("marquee");
track_marquee.classList.add("current-track");
track_marquee.innerText = "Loading ...";

// track bar
let track_bar_div = document.createElement("div");
track_bar_div.classList.add("track-bar");
let track_bar_position_div = document.createElement("div");
track_bar_position_div.classList.add("track-bar-position");
let audio_track_tooltip = document.createElement("span");
// track duration
let track_duration_wrapper_div = document.createElement("div");
track_duration_wrapper_div.classList.add("track-duration-wrapper");
track_duration_wrapper_div.innerHTML = "<span>00:00:00</span>";
let track_duration_div = document.createElement("span");
track_duration_div.classList.add("track-duration");
// tracks
let tracks_div = document.createElement("div");
tracks_div.classList.add("tracks");

// audio tag
let audio_tag = document.createElement("audio");
audio_tag.setAttribute("preload", "metadata");

// flags
let pp_flag = false;
// counters
let currentTrack = 0;
//
//
//
//
// main class
// starts
// here
//
//
//

class SharPlayer {
  constructor(id, data) {
    this.id = String(id);
    this.data = data;
    this.completeTrackInfoList = [];
    switch (this.data.artwork) {
      case true: {
        this.artwork_flag = true;
        break;
      }
      case false: {
        this.artwork_flag = false;
        break;
      }
      default:
        break;
    }
  }
  initPlayer() {
    if (this.artwork_flag === false) {
      switch (this.data.titles) {
        case true: {
          this.data.tracks.map((track, index) => {
            this.completeTrackInfoList[index] = {
              id: index,
              title: title,
              src: track,
            };
          });
          break;
        }
        case false: {
          this.data.tracks.map((track, index) => {
            this.completeTrackInfoList[index] = {
              id: index,
              title: track
                .split("/")
                [track.split("/").length - 1].split(".")[0]
                .toUpperCase(),
              src: track,
            };
          });
          break;
        }
      }
      //   console.log(this.completeTrackInfoList);
    } else if (this.artwork_flag === true) {
    }
    return this;
  }

  show() {
    const root = document.getElementById(this.id);
    // append main class
    root.classList.add("sharplayer");

    // add ids
    const a_title_id = "audio_track_title_" + this.id;
    track_marquee.id = a_title_id;
    const a_track_t_tip_id = "audio_track_tooltip_" + this.id;
    audio_track_tooltip.id = a_track_t_tip_id;
    const a_duration_id = "audio_track_duration_" + this.id;
    track_duration_div.id = a_duration_id;
    const a_id = "audio_" + this.id;
    audio_tag.id = a_id;

    // loop over tracks
    this.completeTrackInfoList.map((trk, i) => {
      // create single track div
      let single_track_div = document.createElement("div");
      single_track_div.classList.add("track");
      //   create artwork for it
      let single_track_artwork = document.createElement("div");
      single_track_artwork.classList.add("small-artwork");
      //   create title for it
      let single_track_title = document.createElement("p");
      single_track_title.classList.add("track-name");
      //   set track name
      single_track_title.innerText = trk.title;
      //   append it to tracks div
      single_track_div.appendChild(single_track_artwork);
      single_track_div.appendChild(single_track_title);
      single_track_div.setAttribute("track_src", trk.src);
      single_track_div.setAttribute("track_id", trk.id);
      single_track_div.setAttribute("track_title", trk.title);

      single_track_div.addEventListener("click", function (event) {
        // console.log(event.target.getAttribute("track_id"));
        if (pp_flag === false) {
          play_pause_btn.innerHTML =
            '<span class="material-icons">pause</span>';
          pp_flag = true;
        }
        let audio_target = document.getElementById(a_id);
        let track_title = document.getElementById(a_title_id);
        let track_duration = document.getElementById(a_duration_id);
        audio_target.src = event.target.getAttribute("track_src");
        track_title.innerText = event.target.getAttribute("track_title");
        audio_target.play();
        currentTrack = i;
        pp_flag = true;
        audio_target.onloadedmetadata = function () {
          track_duration.innerText = readableDuration(audio_target.duration);
        };
        audio_target.ontimeupdate = function () {
          track_duration_wrapper_div.childNodes[0].innerText = readableDuration(
            audio_target.currentTime
          );
          track_bar_position_div.style.setProperty(
            "width",
            `${readableWidth(audio_target.currentTime, audio_target.duration)}%`
          );
        };
      });
      tracks_div.appendChild(single_track_div);
    });

    // add event listners

    // pp button
    play_pause_btn.addEventListener("click", () => {
      this.playFirstTrack();
      if (pp_flag === false) {
        play_pause_btn.innerHTML = '<span class="material-icons">pause</span>';
        pp_flag = true;
        document.getElementById(a_id).play();
      } else {
        play_pause_btn.innerHTML =
          '<span class="material-icons">play_arrow</span>';
        pp_flag = false;
        document.getElementById(a_id).pause();
      }
    });

    // next button
    next_btn.addEventListener("click", () => {
      this.playFirstTrack();
      if (pp_flag === false) {
        play_pause_btn.innerHTML = '<span class="material-icons">pause</span>';
        pp_flag = true;
        this.playNextTrack();
      } else {
        this.playNextTrack();
      }
    });

    // previous button
    prev_btn.addEventListener("click", () => {
      this.playFirstTrack();
      if (pp_flag === false) {
        play_pause_btn.innerHTML = '<span class="material-icons">pause</span>';
        pp_flag = true;
        this.playPreviousTrack();
      } else {
        this.playPreviousTrack();
      }
    });

    track_bar_div.addEventListener("mousemove", (e) => {
      let x = e.clientX,
        y = e.clientY;
      audio_track_tooltip.style.top = y - 25 + "px";
      audio_track_tooltip.style.left = x - 10 + "px";
      let per = Math.floor((e.x / track_bar_div.clientWidth) * 100) - 6;
      if (readableDuration(percentageToSeconds(per, a_id)) !== "0NaN:0NaN") {
        audio_track_tooltip.innerText = readableDuration(
          percentageToSeconds(per, a_id)
        );
      } else {
        audio_track_tooltip.innerText = "No Track"
      }
    });
    track_bar_div.addEventListener("click", (e) => {
      let per = Math.floor((e.x / track_bar_div.clientWidth) * 100) - 6;
      document.getElementById(a_id).currentTime = percentageToSeconds(
        per,
        a_id
      );
    });

    // append to dom
    top_div.appendChild(artwork_div);
    controlls_div.appendChild(prev_btn);
    controlls_div.appendChild(play_pause_btn);
    controlls_div.appendChild(next_btn);
    right_panel_div.appendChild(controlls_div);
    top_div.appendChild(right_panel_div);
    document.body.appendChild(audio_tag);
    root.appendChild(top_div);
    root.appendChild(track_marquee);
    track_bar_div.appendChild(track_bar_position_div);
    track_bar_div.appendChild(audio_track_tooltip);
    root.appendChild(track_bar_div);
    track_duration_wrapper_div.appendChild(track_duration_div);
    root.appendChild(track_duration_wrapper_div);
    root.appendChild(tracks_div);
  }

  playFirstTrack() {
    const a_title_id = "audio_track_title_" + this.id;
    track_marquee.id = a_title_id;
    const a_track_t_tip_id = "audio_track_tooltip_" + this.id;
    audio_track_tooltip.id = a_track_t_tip_id;
    const a_duration_id = "audio_track_duration_" + this.id;
    track_duration_div.id = a_duration_id;
    const a_id = "audio_" + this.id;
    audio_tag.id = a_id;
    const audio_target = document.getElementById(a_id);
    const track_duration = document.getElementById(a_duration_id);
    if (audio_target.src == "") {
      audio_target.src = this.completeTrackInfoList[0].src;
      track_marquee.innerText = this.completeTrackInfoList[0].title;
      audio_target.onloadedmetadata = function () {
        track_duration.innerText = readableDuration(audio_target.duration);
      };
      audio_target.ontimeupdate = function () {
        track_duration_wrapper_div.childNodes[0].innerText = readableDuration(
          audio_target.currentTime
        );
        track_bar_position_div.style.setProperty(
          "width",
          `${readableWidth(audio_target.currentTime, audio_target.duration)}%`
        );
      };
    }
  }

  playNextTrack() {
    if (currentTrack > this.completeTrackInfoList.length - 2) {
      currentTrack = 0;
      this.playTrackWithId(currentTrack);
    } else {
      currentTrack += 1;
      this.playTrackWithId(currentTrack);
    }
  }
  playPreviousTrack() {
    if (currentTrack <= 0) {
      currentTrack = this.completeTrackInfoList.length - currentTrack - 1;
      this.playTrackWithId(currentTrack);
    } else {
      currentTrack -= 1;
      this.playTrackWithId(currentTrack);
    }
  }

  playTrackWithId(index) {
    const a_title_id = "audio_track_title_" + this.id;
    track_marquee.id = a_title_id;
    const a_track_t_tip_id = "audio_track_tooltip_" + this.id;
    audio_track_tooltip.id = a_track_t_tip_id;
    const a_duration_id = "audio_track_duration_" + this.id;
    track_duration_div.id = a_duration_id;
    const a_id = "audio_" + this.id;
    audio_tag.id = a_id;
    const audio_target = document.getElementById(a_id);
    const track_duration = document.getElementById(a_duration_id);
    audio_target.src = this.completeTrackInfoList[index].src;
    track_marquee.innerText = this.completeTrackInfoList[index].title;
    audio_target.onloadedmetadata = function () {
      track_duration.innerText = readableDuration(audio_target.duration);
    };
    audio_target.ontimeupdate = function () {
      track_duration_wrapper_div.childNodes[0].innerText = readableDuration(
        audio_target.currentTime
      );
      track_bar_position_div.style.setProperty(
        "width",
        `${readableWidth(audio_target.currentTime, audio_target.duration)}%`
      );
    };
    audio_target.play();
  }
}

function readableDuration(seconds) {
  sec = Math.floor(seconds);
  min = Math.floor(sec / 60);
  min = min >= 10 ? min : "0" + min;
  sec = Math.floor(sec % 60);
  sec = sec >= 10 ? sec : "0" + sec;
  return min + ":" + sec;
}

function readableWidth(seconds, duration) {
  current = Math.floor(seconds);
  total = duration;
  return (current / duration) * 100;
}

function percentageToSeconds(percentage, id) {
  const tgt = document.getElementById(id);
  const time = (percentage * tgt.duration) / 100;
  return time;
}
