import {connect} from 'react-redux'

import {getCompilations, createCompilationsBulk, calculateBase} from '../modules/library'
import Library from '../components/Library'

const mapDispatchToProps = {
  getCompilations,
  createCompilationsBulk,
  calculateBase,
}

const mapStateToProps = (state, props) => ({
  libraryName: props.match.params.libraryName,
  fetching: state.library.fetching,
  compilations: state.library.compilations,
  createCompilationsBulkPopup: state.popups.createCompilationsBulkPopup,
  moreCompilationsPopup: state.popups.moreCompilationsPopup,
})

export default connect(mapStateToProps, mapDispatchToProps)(Library)
