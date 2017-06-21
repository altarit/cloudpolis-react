import {connect} from 'react-redux'

import {getCollections} from '../modules/collections'
import Collections from '../components/Collections'

const mapDispatchToProps = {
  getCollections
}

const mapStateToProps = (state, props) => ({
  fetching: state.collections.fetching,
  collections: state.collections.collections
})

export default connect(mapStateToProps, mapDispatchToProps)(Collections)

