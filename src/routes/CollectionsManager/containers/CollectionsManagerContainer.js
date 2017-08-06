import {connect} from 'react-redux'

import {sendCollection} from '../modules/collectionsManager'
import CollectionsManager from '../components/CollectionsManager'

const mapDispatchToProps = {
  sendCollection,
}

const mapStateToProps = (state, props) => ({
  fetching: state.collections.fetching,
  path: state.location.pathname.substring('/music/collections/create'.length),
  base: state.collections.base,
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsManager)
