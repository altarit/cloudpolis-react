import {connect} from 'react-redux'

import {getTracksByQuery} from '../modules/search'
import Search from '../components/Search'

const mapDispatchToProps = {
  getTracksByQuery
}

const mapStateToProps = (state, props) => ({
  songs: state.search.songs,
  fetching: state.search.fetching
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
