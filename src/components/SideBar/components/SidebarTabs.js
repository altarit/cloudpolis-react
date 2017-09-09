import React, {PropTypes} from 'react'

import './SideBarTabs.scss'

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
      <li key={plName} className='nav-item option' onClick={e => {
        this.props.selectTab(plName)
      }}>
        <a
          className={'playmenu__tab nav-link' + (this.props.openTab === plName ? ' active' : '')}
          draggable='true'
        >
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
      <div className='playmenu__tabs dropdown'>
        <button
          className='btn btn-def fa fa-chevron-left playmenu__tabs-control'
          onClick={this.scrollLeft}
        />

        <div className='playmenu__tabs-center'>
          <ul className='nav nav-tabs playmenu__tabs-list' style={{marginLeft: -this.props.scrolledTabs * 70}}>
            {this.getTabs()}
          </ul>
        </div>

        <button
          type='button'
          className='btn fa btn-def fa-chevron-right playmenu__tabs-control'
          onClick={this.scrollRight}
        />
        <button
          type='button'
          className='btn btn-def fa fa-list playmenu__tabs-control'
          data-click='dropdown'
          data-for='allPlaylists'
        />

        <div className='dropdown playmenu__tabs-dropdown'>
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
