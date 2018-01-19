import React from 'react'
import PropTypes from 'prop-types'

export class SidebarTopMenu extends React.Component {
  static propTypes = {
    muted: PropTypes.bool.isRequired,
    repeated: PropTypes.bool.isRequired,

    toggleMute: PropTypes.func.isRequired,
    toogleRepeat: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
  }

  volumeChanged = (e) => {
    this.props.setVolume((e.target.value / 20) * (e.target.value / 20))
  }

  render() {
    return (
      <div className='playmenu__top'>
        <button
          type='button'
          className={'btn fa btn-def ' + (this.props.repeated ? 'btn-danger fa-retweet' : 'fa-retweet')}
          onClick={this.props.toogleRepeat}
        />
        <button type='button' className='btn btn-def fa fa-bell' />
        <div className='playmenu__top-empty' />
        <button
          type='button'
          className={'btn fa btn-def ' + (this.props.muted ? 'btn-danger fa-volume-off' : 'fa-volume-up')}
          style={{width: 40}}
          onClick={this.props.toggleMute}
        />
        <input
          type='range'
          className='playmenu__volume-slider'
          min='1' max='20'
          defaultValue='10'
          onChange={this.volumeChanged}
        />
      </div>
    )
  }
}

export default SidebarTopMenu
