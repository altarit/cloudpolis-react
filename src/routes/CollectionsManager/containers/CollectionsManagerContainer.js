import {connect} from 'react-redux'

import {sendCollection, deleteCompilations, deleteSongs, extractSongs} from '../modules/collectionsManager'
import CollectionsManager from '../components/CollectionsManager'

const mapDispatchToProps = {
  sendCollection,
  deleteCompilations,
  deleteSongs,
  extractSongs
}

const mapStateToProps = (state, props) => ({
  fetching: state.collections.fetching
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsManager)
