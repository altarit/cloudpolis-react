import {connect} from 'react-redux'

import {getCollections, toggleTree} from '../modules/collections'
import Collections from '../components/Collections'

const mapDispatchToProps = {
  getCollections,
  toggleTree
}

const mapStateToProps = (state, props) => ({
  fetching: state.collections.fetching,
  dirs: state.collections.dirs
})

export default connect(mapStateToProps, mapDispatchToProps)(Collections)
