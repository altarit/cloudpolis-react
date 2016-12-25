import {connect} from 'react-redux'

import Track from '../components/Track'
import {setTrack} from '../../../modules/player'


const mapDispatchToProps = {
  playSong: setTrack
}

const mapStateToProps = (state, props) => ({
  title: props.title
})

export default connect(mapStateToProps, mapDispatchToProps)(Track)
