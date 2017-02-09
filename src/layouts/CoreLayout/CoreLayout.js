import React from 'react'

import Content from '../Content'
import Sidebar from '../../components/Sidebar'
import BottomBar from '../../components/BottomBar'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({children}) => (
  <div>
    <Content children={children} />
    <Sidebar />
    <BottomBar />
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
