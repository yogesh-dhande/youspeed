const MAX_SPEED = 3.0;
const MIN_SPEED = 0.75;
const MAX_SCROLL_DELTA = 100;
const RATE_CHANGE_PER_SCROLL_DELTA = 0.001;

window.onload = function() {
  function handleScroll(e) {
    let delta = 0;
    if (e.deltaY < 0) {
      delta = Math.min(-MAX_SCROLL_DELTA, e.deltaY);
    } else {
      delta = Math.min(MAX_SCROLL_DELTA, e.deltaY);
    }
    const videos = document.getElementsByTagName("video");
    for (let video of videos) {
      if (!video.paused && video.matches(":hover")) {
        e.preventDefault();
        const newRate = video.playbackRate + delta * RATE_CHANGE_PER_SCROLL_DELTA;
        if (newRate < MIN_SPEED) video.playbackRate = MIN_SPEED;
        else if (newRate > MAX_SPEED) video.playbackRate = MAX_SPEED;
        else video.playbackRate = newRate;
      }
    }
  }

  // https://stackoverflow.com/questions/20026502/prevent-mouse-wheel-scrolling-but-not-scrollbar-event-javascript
  addEventListener("wheel", handleScroll, { passive: false });
}