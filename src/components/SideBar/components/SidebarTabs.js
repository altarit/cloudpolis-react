import React, {PropTypes} from 'react'

import './SidebarTabs.scss'

export class SidebarTabs extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired,
    openTab: PropTypes.string.isRequired,
    scrolledTabs: PropTypes.number.isRequired,
    popups: PropTypes.object.isRequired,

    selectTab: PropTypes.func.isRequired,
    scrollLeft: PropTypes.func.isRequired,
    scrollRight: PropTypes.func.isRequired,
  }

  getTabs = () => {
    return this.props.tabs.map(plName => (
      <li key={plName} className={'nav-item'} onClick={e => { this.props.selectTab(plName) }}>
        <a className={'playmenu__tab nav-link' + (this.props.openTab === plName ? ' active' : '')} draggable='true'>
          {plName}
        </a>
      </li>
    ))
  }

  scrollRight = () => {
    if (this.props.tabs.length - this.props.scrolledTabs >= 2) {
      this.props.scrollRight()
    }
  }

  scrollLeft = () => {
    if (this.props.scrolledTabs > 0) {
      this.props.scrollLeft()
    }
  }

  render() {
    return (
      <div className='playmenu__tabs'>
        <div className='playmenu__tabs-left'>
          <button
            className='btn btn-primary fa fa-chevron-left playmenu__tabs-control'
            onClick={this.scrollLeft}
          />
        </div>

        <div className='playmenu__tabs-center'>
          <ul className='nav nav-tabs playmenu__tabs-list' style={{marginLeft: -this.props.scrolledTabs * 72}}>
            {this.getTabs()}
          </ul>
        </div>

        <div className='playmenu__tabs-right dropdown'>
          <button
            type='button'
            className='btn fa btn-primary fa-chevron-right playmenu__tabs-control'
            onClick={this.scrollRight}
          />
          <button
            type='button'
            className='btn btn-primary fa fa-list playmenu__tabs-control'
            data-click='dropdown'
            data-for='allPlaylists'
          />
          {this.props.popups.allPlaylists ? (
            <ul className='dropdown-menu show'>
              {this.getTabs()}
            </ul>) : ''}
        </div>
      </div>
    )
  }
}

export default SidebarTabs
