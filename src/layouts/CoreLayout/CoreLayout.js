import React from 'react'
import PropTypes from 'prop-types'

import Content from '../Content'
import Sidebar from '../../components/SideBar'
import BottomBar from '../../components/BottomBar'
import './CoreLayout.scss'
import '../../styles/main.scss'

export const CoreLayout = ({children}) => (
  <div>
    <Content children={children} />
    <Sidebar />
    <BottomBar />
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default CoreLayout
