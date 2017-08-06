import {connect} from 'react-redux'

import {sendCollection, calculateBase} from '../modules/collectionsManager'
import CollectionsManager from '../components/CollectionsManager'

const mapDispatchToProps = {
  sendCollection,
  calculateBase
}

const mapStateToProps = (state, props) => ({
  fetching: state.collectionsManager.fetching,
  path: state.location.pathname.substring('/music/collections/create'.length),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsManager)
