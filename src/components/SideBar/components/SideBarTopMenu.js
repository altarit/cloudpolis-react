import React, {PropTypes} from 'react'

export class SidebarTopMenu extends React.Component {
  static propTypes = {
    muted: PropTypes.bool.isRequired,

    toggleMute: PropTypes.func.isRequired,
    setVolume: PropTypes.func.isRequired,
  }

  volumeChanged = (e) => {
    this.props.setVolume((e.target.value / 20) * (e.target.value / 20))
  }

  render() {
    return (
      <div className='playmenu__top'>
        <button type='button' className='btn btn-primary fa fa-fast-backward' />
        <button type='button' className='btn btn-primary fa fa-fast-forward' />
        <button type='button' className='btn btn-primary fa fa-retweet' />
        <button type='button' className='btn btn-primary fa fa-random' />
        <div className='playmenu__volume'>
          {this.props.muted ? (
            <button
              type='button'
              className='btn btn-danger fa fa-volume-off'
              style={{width: 40}}
              onClick={this.props.toggleMute}
            />
          ) : (
            <button
              type='button'
              className='btn btn-primary fa fa-volume-up'
              onClick={this.props.toggleMute}
            />
          )}
          <input
            type='range'
            className='playmenu__volume-slider'
            min='1' max='20'
            defaultValue='10'
            onChange={this.volumeChanged}
          />
        </div>
      </div>
    )
  }
}

export default SidebarTopMenu
