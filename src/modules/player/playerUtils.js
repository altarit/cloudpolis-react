export function cloneTrack(track) {
  return {
    id: track.id,
    title: track.title,
    library: track.library,
    artist: track.artist,
    src: track.src,
    duration: track.duration,
    compilation: track.compilation,
  }
}

export function setTitle(track) {
  if (track) {
    document.title = track.title
  } else {
    // document.title = 'Cloudpolis'
  }
}
