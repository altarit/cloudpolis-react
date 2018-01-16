import {connect} from 'react-redux'

import {getCompilations, createCompilationsBulk, calculateBase} from '../modules/library'
import Library from '../components/Library'

const mapDispatchToProps = {
  getCompilations,
}

const mapStateToProps = (state, props) => ({
  libraryName: props.match.params.libraryName,
  fetching: state.library.fetching,
  compilations: state.library.compilations,
  moreCompilationsPopup: state.popups.moreCompilationsPopup,
})

export default connect(mapStateToProps, mapDispatchToProps)(Library)
