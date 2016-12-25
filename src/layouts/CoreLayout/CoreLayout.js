import React from 'react';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import Player from '../../components/Player';
import './CoreLayout.scss';
import '../../styles/core.scss';

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
    <SideBar />
    <Player />
  </div>
);

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
