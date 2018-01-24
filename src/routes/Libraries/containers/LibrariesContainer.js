import {connect} from 'react-redux'

import {getLibraries, createLibrary, deleteLibrary} from '../modules/libraries'
import {deleteCollections, deleteSongs, extractSongs} from '../modules/librariesManager'
import Libraries from '../components/Libraries'

const mapDispatchToProps = {
  getLibraries,
  createLibrary,
  deleteLibrary,

  deleteCollections,
  deleteSongs,
  extractSongs,
}

const mapStateToProps = (state) => ({
  fetching: state.libraries.fetching,
  libraries: state.libraries.libraries,
  addLibraryPopup: state.popups.addLibraryPopup,
  moreLibrariesPopup: state.popups.moreLibrariesPopup
})

export default connect(mapStateToProps, mapDispatchToProps)(Libraries)
