import {connect} from 'react-redux'

import Song from '../components/Song'
import {setTrack} from '../../BottomBar/modules/bottomBar'


const mapDispatchToProps = {
  playSong: setTrack
}

const mapStateToProps = (state, props) => ({
  title: props.title
})

export default connect(mapStateToProps, mapDispatchToProps)(Song)
