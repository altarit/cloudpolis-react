import React from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className='container'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
    <Sidebar />
    <Player />
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
