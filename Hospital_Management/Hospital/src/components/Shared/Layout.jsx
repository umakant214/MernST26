import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ zone, children, pageTitle, breadcrumb }) => {
  return (
    <div className="app-wrapper">
      <Sidebar zone={zone} />
      <div className="main-content">
        <Header zone={zone} />
        <div className="page-header py-3 px-3 px-lg-4 bg-white border-bottom">
          <div className="page-title">{pageTitle}</div>
          <div className="breadcrumb-text">{breadcrumb}</div>
        </div>
        <div className="page-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;