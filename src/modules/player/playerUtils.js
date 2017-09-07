export function cloneTrack(track) {
  return {
    title: track.title,
    library: track.library,
    artist: track.artist,
    src: (track.src || track.href),
    duration: track.duration,
    compilation: track.compilation
  }
}

export function setTitle(track) {
  if (track) {
    document.title = track.title
  } else {
    // document.title = 'Cloudpolis'
  }
}
